import traceback
from pydirwatch import listen
from pathlib import Path

import asyncio

import websockets


async def handler(websocket):
    while True:
        message = await websocket.recv()
        print(message)


async def main():
    async with websockets.serve(handler, "", 8001):
        await asyncio.Future()  # run forever


for new_file_path in listen(Path("."),  pattern = "*.pcap"):
    try:
        #DO STUFF with new_file_path
        print(f"{new_file_path}")
            
    except Exception:
        # For use cases such as writing to database often exceptions 
        # should be handled without raising exceptions and stopping python process.
       traceback.print_exc()

if __name__ == "__main__":
    print("asyncio")
    asyncio.run(main())

