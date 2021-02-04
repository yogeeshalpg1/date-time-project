from channels.consumer import SyncConsumer,AsyncConsumer
from channels.exceptions import StopConsumer
import datetime
import asyncio


class DateConsumer(AsyncConsumer):

    async def websocket_connect(self,event):

        print('Connect event is called')
        await self.send({
        'type':'websocket.accept'
        })


    async def websocket_receive(self,event):

        print('received')  
        current_date = datetime.datetime.now()
        while True:
            await asyncio.sleep(1)
            current_date = datetime.datetime.now()
            await self.send({
                'type': 'websocket.send',
                'text': str(current_date),
            })


    async def websocket_disconnect(self,event):

        print('disconnected')   

        raise StopConsumer  