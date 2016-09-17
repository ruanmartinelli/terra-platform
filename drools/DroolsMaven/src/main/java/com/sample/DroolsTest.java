package com.sample;

import org.kie.api.KieServices;
import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;

import org.zeromq.ZMQ;
import org.zeromq.ZMQ.Context;
import org.zeromq.ZMQ.Socket;

import com.sample.model.Temperature;

/**
 * This is a sample class to launch a rule.
 */
public class DroolsTest {

    public static final void main(String[] args) {
        try {        	
            // load up the knowledge base
	        KieServices ks = KieServices.Factory.get();
    	    KieContainer kContainer = ks.getKieClasspathContainer();
        	KieSession kSession = kContainer.newKieSession("ksession-rules");

            //Temperature dado1 = new Temperature(200);
            //kSession.insert(dado1);
        	//kSession.fireAllRules();
        	
        	
        	
        	
            // Prepare our context and subscriber
            Context context = ZMQ.context(1);
            Socket subscriber = context.socket(ZMQ.SUB);

            subscriber.connect("tcp://127.0.0.1:12345");
            subscriber.subscribe("Temperature".getBytes());
            
            while (!Thread.currentThread ().isInterrupted ()) {
                String contents = subscriber.recvStr();
                String dados[] = contents.split(" ");
                System.out.println("Temperature:" + dados[1]);
                
                Temperature dado = new Temperature(Integer.parseInt(dados[1]));
                
                //System.out.println(dado);
                
                kSession.insert(dado);
                kSession.fireAllRules();
                
                //System.out.println(address + " : " + contents);
            }
            subscriber.close ();
            context.term ();
            

            
        } catch (Throwable t) {
            t.printStackTrace();
        }
    }

    public static class Message {

        public static final int HELLO = 0;
        public static final int GOODBYE = 1;

        private String message;

        private int status;

        public String getMessage() {
            return this.message;
        }

        public void setMessage(String message) {
            this.message = message;
        }

        public int getStatus() {
            return this.status;
        }

        public void setStatus(int status) {
            this.status = status;
        }

    }

}
