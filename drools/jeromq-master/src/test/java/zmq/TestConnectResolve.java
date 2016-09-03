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

public class TestConnectResolve
{
    @Test
    public void testConnectResolve()
    {
        System.out.println("test_connect_resolve running...\n");

        Ctx ctx = ZMQ.init(1);
        assertThat(ctx, notNullValue());

        //  Create pair of socket, each with high watermark of 2. Thus the total
        //  buffer space should be 4 messages.
        SocketBase sock = ZMQ.socket(ctx, ZMQ.ZMQ_PUB);
        assertThat(sock, notNullValue());

        boolean brc = ZMQ.connect(sock, "tcp://localhost:1234");
        assertThat(brc, is(true));

        /*
        try {
            brc = ZMQ.connect (sock, "tcp://foobar123xyz:1234");
            assertTrue(false);
        } catch (IllegalArgumentException e) {
        }
        */

        ZMQ.close(sock);
        ZMQ.term(ctx);
    }
}
