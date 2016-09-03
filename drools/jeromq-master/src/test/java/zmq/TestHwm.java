/*
    Copyright (c) 2007-2014 Contributors as noted in the AUTHORS file

    This file is part of 0MQ.

    0MQ is free software; you can redistribute it and/or modify it under
    the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation; either version 3 of the License, or
    (at your option) any later version.

    0MQ is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

package zmq;

import org.junit.Test;
import static org.junit.Assert.assertThat;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.notNullValue;

public class TestHwm
{
    @Test
    public void testHwm()
    {
        Ctx ctx = ZMQ.init(1);
        assertThat(ctx, notNullValue());

        int rc = 0;
        boolean brc = false;
        //  Create pair of socket, each with high watermark of 2. Thus the total
        //  buffer space should be 4 messages.
        SocketBase sb = ZMQ.socket(ctx, ZMQ.ZMQ_PULL);
        assertThat(sb, notNullValue());
        int hwm = 2;
        ZMQ.setSocketOption(sb, ZMQ.ZMQ_RCVHWM, hwm);

        brc = ZMQ.bind(sb, "inproc://a");
        assertThat(brc, is(true));

        SocketBase sc = ZMQ.socket(ctx, ZMQ.ZMQ_PUSH);
        assertThat(sc, notNullValue());

        ZMQ.setSocketOption(sc, ZMQ.ZMQ_SNDHWM, hwm);

        brc = ZMQ.connect(sc, "inproc://a");
        assertThat(brc, is(true));

        //  Try to send 10 messages. Only 4 should succeed.
        for (int i = 0; i < 10; i++) {
            rc = ZMQ.send(sc, null, 0, ZMQ.ZMQ_DONTWAIT);
            if (i < 4) {
                assertThat(rc, is(0));
            }
            else {
                assertThat(rc, is(-1));
            }
        }

        Msg m;
        // There should be now 4 messages pending, consume them.
        for (int i = 0; i != 4; i++) {
            m = ZMQ.recv(sb, 0);
            assertThat(m, notNullValue());
            assertThat(m.size(), is(0));
        }

        // Now it should be possible to send one more.
        rc = ZMQ.send(sc, null, 0, 0);
        assertThat(rc, is(0));

        //  Consume the remaining message.
        m = ZMQ.recv(sb, 0);
        assertThat(rc, notNullValue());
        assertThat(m.size(), is(0));

        ZMQ.close(sc);
        ZMQ.close(sb);
        ZMQ.term(ctx);
    }
}
