import uuid4 from 'uuid4'
export default{
    list: () => ([
        {
            id: uuid4(),
            src: 'https://images.unsplash.com/photo-1643120395568-dfeeca28e1a2?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=768&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY0NDIyMTI4OA&ixlib=rb-1.2.1&q=80&w=1024',
            tags: [
                'Lorem',
                'dolor',
                'incididunt',
                'labore',
                'dolore',
            ]

        }
    ]),
    upload: function (src, photoID, onSuccess, onError) {
        setTimeout(function() {
            if ( (Math.random()*100) < 90 ){
                onSuccess(src, photoID);
            }else{
                onError(photoID, 'random Error');
            }
        }, (Math.random()*(5 - 2) + 2)*1000 );
    }
}