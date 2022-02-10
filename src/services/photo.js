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
                'aliqua',
                'enim'
            ]

        },
        {
            id: uuid4(),
            src: 'https://images.unsplash.com/photo-1643131113414-6c65caa950bd?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=768&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY0MzkxNzEzMg&ixlib=rb-1.2.1&q=80&w=1024',
            tags: [
                'consectetur'
            ]
        },
        {
            id: uuid4(),
            src: 'https://images.unsplash.com/photo-1643106027845-1ab7dd206378?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=768&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY0NDIyMTIwMA&ixlib=rb-1.2.1&q=80&w=1024',
            tags: [
                'dolor',
                'consectetur'
            ]
        },
        {
            id: uuid4(),
            src: 'https://images.unsplash.com/photo-1639174286294-f0124b935607?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=768&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY0MzkxNzE2Nw&ixlib=rb-1.2.1&q=80&w=1024',
            tags: [
                'Lorem',
                'consectetur'
            ]
        }
    ]),
    upload: function (src, photoID, onSuccess, onError) {
        console.log(`start upload... src: ${src}`);
        setTimeout(function() {
            if ( (Math.random()*100) < 90 ){
                console.log('success!');
                onSuccess(src, photoID);
            }else{
                console.log('error!');
                onError(photoID, 'random Error');
            }
        }, (Math.random()*(5 - 2) + 2)*1000 );
    }
}