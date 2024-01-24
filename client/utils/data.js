const postImages = [
    '/event1.jpg',
    '/event2.jpg',
    '/event3.jpg',
    '/event4.jpg',
    '/event5.jpg',
]

const feedPosts = [
    {
        _id: '60e2d0f4a2c6e00c9c8a8d7a',
        title: 'Event 1',
        description: 'This is the description for event 1',
        postImage: '/event1.jpg',
        user: '65afdcc340ce47130a18ba9d',
        likes: [
            '60e2d0f4a2c6e00c9c8a8d7a',
            '60e2d0f4a2c6e00c9c8a8d7a',
            '60e2d0f4a2c6e00c9c8a8d7a',
            '60e2d0f4a2c6e00c9c8a8d7a',
        ],
        comments: [
            {
                comment: 'This is a comment',
                user: '65afdcc340ce47130a18ba9d',
                createdAt: '2021-07-05T10:06:00.000Z',
                reply: [
                    {
                        comment: 'This is a reply',
                        user: '65afdcc340ce47130a18ba9d',
                        createdAt: '2021-07-05T10:06:00.000Z'
                    }
                ]
            }
        ],
        isEdited: false,
        interests: ['sports', 'music'],
        createdAt: '2021-07-05T10:06:00.000Z',
    },
    {
        title: 'Event 2',
        description: 'This is the description for event 2',
        postImage: '/event2.jpg',
        user: '65afdcc340ce47130a18ba9d',
        likes: [
            '60e2d0f4a2c6e00c9c8a8d7a',
            '60e2d0f4a2c6e00c9c8a8d7a',
            '60e2d0f4a2c6e00c9c8a8d7a',
            '60e2d0f4a2c6e00c9c8a8d7a',
        ],
        comments: [
            {
                comment: 'This is a comment',
                user: '65afdcc340ce47130a18ba9d',
                createdAt: '2021-07-05T10:06:00.000Z',
                reply: [
                    {
                        comment: 'This is a reply',
                        user: '65afdcc340ce47130a18ba9d',
                        createdAt: '2021-07-05T10:06:00.000Z'
                    }
                ]
            }
        ],
        isEdited: false,
        interests: ['sports', 'music'],
        createdAt: '2021-07-05T10:06:00.000Z',
    },
    {
        title: 'Event 3',
        description: 'This is the description for event 3',
        postImage: '/event3.jpg',
        user: '65afdcc340ce47130a18ba9d',
        likes: [
            '60e2d0f4a2c6e00c9c8a8d7a',
            '60e2d0f4a2c6e00c9c8a8d7a',
            '60e2d0f4a2c6e00c9c8a8d7a',
            '60e2d0f4a2c6e00c9c8a8d7a',
        ],
        comments: [
            {
                comment: 'This is a comment',
                user: '65afdcc340ce47130a18ba9d',
                createdAt: '2021-07-05T10:06:00.000Z',
                reply: [
                    {
                        comment: 'This is a reply',
                        user: '65afdcc340ce47130a18ba9d',
                        createdAt: '2021-07-05T10:06:00.000Z'
                    }
                ]
            }
        ],
        isEdited: false,
        interests: ['sports', 'music'],
        createdAt: '2021-07-05T10:06:00.000Z',
    },
]

const suggestedUsers = [
    {
        name: 'John Doe',
        username: 'johndoe',
        profilePicture: '/profile1.jpg',
        bio: 'This is a bio',
        interests: ['sports', 'music'],
        followers: [
            '60e2d0f4a2c6e00c9c8a8d7a',
            '60e2d0f4a2c6e00c9c8a8d7a',
            '60e2d0f4a2c6e00c9c8a8d7a',
        ],
        following: [
            '60e2d0f4a2c6e00c9c8a8d7a',
            '60e2d0f4a2c6e00c9c8a8d7a',
        ],
        createdAt: '2021-07-05T10:06:00.000Z',
    },
    {
        name: 'Jane Doe',
        username: 'janedoe',
        profilePicture: '/profile2.jpg',
        bio: 'This is a bio',
        interests: ['sports', 'music'],
        followers: [
            '60e2d0f4a2c6e00c9c8a8d7a',
            '60e2d0f4a2c6e00c9c8a8d7a',
            '60e2d0f4a2c6e00c9c8a8d7a',
        ],
        following: [
            '60e2d0f4a2c6e00c9c8a8d7a',
            '60e2d0f4a2c6e00c9c8a8d7a',
        ],
        createdAt: '2021-07-05T10:06:00.000Z',
    },
    {
        name: 'John Smith',
        username: 'johnsmith',
        profilePicture: '/profile3.jpg',
        bio: 'This is a bio',
        interests: ['sports', 'music'],
        followers: [
            '60e2d0f4a2c6e00c9c8a8d7a',
            '60e2d0f4a2c6e00c9c8a8d7a',
            '60e2d0f4a2c6e00c9c8a8d7a',
        ],
        following: [
            '60e2d0f4a2c6e00c9c8a8d7a',
            '60e2d0f4a2c6e00c9c8a8d7a',
        ],
        createdAt: '2021-07-05T10:06:00.000Z',
    },
]

export { postImages, feedPosts, suggestedUsers }