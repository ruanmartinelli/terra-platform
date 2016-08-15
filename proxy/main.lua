require"zmq"
require"util/zhelpers"
require"math"

math.randomseed(os.time())

local context = zmq.init(1)
local publisher = context:socket(zmq.PUB)
publisher:bind("tcp://*:5563")

local id = 0;

while true do

    -- TODO
    -- The message sent below should be from
    -- the WSN's sync node, which will be extracted
    -- using tossam's library.

    print("Sending... ID > " ..id)
    publisher:send("test", zmq.SNDMORE)
    publisher:send("msgID: " .. id .." / Node: 11 / Target: 65535 / d8: 0 0 0 / d16: " .. math.random(10,35).. " 0 0 / d32: 0 0")

    id = id + 1

    s_sleep (5000)
end

publisher:close()
context:term()
