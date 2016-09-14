package br.ufes.inf;

import org.zeromq.ZMQ;
import org.zeromq.ZMQ.Context;
import org.zeromq.ZMQ.Socket;

/**
* Pubsub envelope subscriber
*/

public class Main {

    public static void main (String[] args) {

        // Prepare our context and subscriber
        Context context = ZMQ.context(1);
        Socket subscriber = context.socket(ZMQ.SUB);

        subscriber.connect("tcp://127.0.0.1:12345");
        subscriber.subscribe("Temperature".getBytes());
        while (!Thread.currentThread ().isInterrupted ()) {
            // Read envelope with address
            String address = subscriber.recvStr ();
            // Read message contents
            String contents = subscriber.recvStr ();
            System.out.println(address + " : " + contents);
        }
        subscriber.close ();
        context.term ();
    }
}
