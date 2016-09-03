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

import java.net.Inet6Address;
import java.net.InetSocketAddress;
import java.net.SocketAddress;

public class Address
{
    public interface IZAddress
    {
        String toString();
        void resolve(String name, boolean ip4only);
        SocketAddress address();
    };

    private final String protocol;
    private final String address;
    private final boolean ipv4only;

    private IZAddress resolved;

    public Address(final String protocol, final String address, final boolean ipv4only)
    {
        this.protocol = protocol;
        this.address = address;
        this.ipv4only = ipv4only;
        resolved = null;
    }

    public Address(SocketAddress socketAddress)
    {
        InetSocketAddress sockAddr = (InetSocketAddress) socketAddress;
        this.address = sockAddr.getAddress().getHostAddress() + ":" + sockAddr.getPort();
        protocol = "tcp";
        resolved = null;
        ipv4only = !(sockAddr.getAddress() instanceof Inet6Address);
    }

    @Override
    public String toString()
    {
        if (protocol.equals("tcp") && isResolved()) {
            return resolved.toString();
        }
        else if (protocol.equals("ipc") && isResolved()) {
            return resolved.toString();
        }
        else if (!protocol.isEmpty() && !address.isEmpty()) {
            return protocol + "://" + address;
        }
        else {
            return "";
        }
    }

    public String protocol()
    {
        return protocol;
    }

    public String address()
    {
        return address;
    }

    public IZAddress resolved()
    {
        return resolved;
    }

    public boolean isResolved()
    {
        return resolved != null;
    }

    public boolean resolve()
    {
       if (protocol.equals("tcp")) {
            resolved = new TcpAddress();
            resolved.resolve(address, ipv4only);
            return true;
        }
        else if (protocol.equals("ipc")) {
            resolved = new IpcAddress();
            resolved.resolve(address, true);
            return true;
        }
        else {
            return false;
        }
    }
}
