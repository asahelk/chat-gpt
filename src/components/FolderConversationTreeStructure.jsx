export function FolderConversationTreeStructure(){

    const conversationList = [
        {
          id: 'asdas',
          title: 'Basic',
          isFolder: false,
          isFavorite: false
        },
        {
          id: 'asdas2',
          title: 'This should be a Folder',
          isFolder: true,
          conversationList: [
            {
              id: 'asdas5',
              title: 'Example',
              isFolder: false,
              isFavorite: false
            },
            {
              id: 'asdas6',
              title: 'This is favorite',
              isFolder: false,
              isFavorite: true
            },
            {
              id: 'asdas7',
              title: 'This is a folder',
              isFolder: true,
              conversationList: [
                {
                  id: 'asdas8',
                  title: 'Basic',
                  isFolder: false,
                  isFavorite: true
                },
                {
                  id: 'asdas9',
                  title: 'Empty Folder',
                  isFolder: true,
                  isFavorite: true
                }
              ],
              isFavorite: false
            }
          ],
          isFavorite: false
        },
        {
          id: 'asdas3',
          title: 'This is favorite',
          isFolder: false,
          isFavorite: true
        },
        {
          id: 'asdas4',
          title: 'Basic',
          isFolder: false,
          isFavorite: false
        }
      ]


      [
        {
          "messages": null,
          "chatTitle": "(Example) Chat with comedian",
          "model": "gpt-3.5-turbo",
          "systemMessage": "You are a standup comedian, you make people laugh with your satire, jokes and humor. You answer everything in a humorous way to cheer the user up. Use satire and make fun of everything the user says in a positive way.",
          "character": {
            "id": "standup_comedian",
            "title": "Standup Comedian",
            "instruction": "You are a standup comedian, you make people laugh with your satire, jokes and humor. You answer everything in a humorous way to cheer the user up. Use satire and make fun of everything the user says in a positive way.",
            "description": "A standup comedian who can make you laugh with their jokes and humor.",
            "color": "#F0FFF0"
          },
          "chatID": "cb9cd659-131a-4451-bda2-04f748c8fda2",
          "updatedAt": "2023-03-11T02:57:36.557Z",
          "preview": "Hey there, Mr. Yo! Is that some sort of new yoghur",
          "id": "cb9cd659-131a-4451-bda2-04f748c8fda2",
          "title": "(Example) Chat with comedian",
          "favoritedAt": null
        },
        {
          "messages": null,
          "chatTitle": "(Example) Generating domain names",
          "model": "gpt-3.5-turbo",
          "systemMessage": "You are ChatGPT, a large language model trained by OpenAI.",
          "character": null,
          "chatID": "dbaa830d-8658-4fcd-aa10-17e3f83fc231",
          "updatedAt": "2023-03-11T02:57:24.561Z",
          "preview": "1. TaskGrid.com\n2. TodoHive.com\n3. TaskSpot.com\n4.",
          "id": "dbaa830d-8658-4fcd-aa10-17e3f83fc231",
          "title": "(Example) Generating domain names",
          "favoritedAt": null
        },
        {
          "messages": null,
          "chatTitle": "(Example) Fix grammar errors",
          "model": "gpt-3.5-turbo",
          "systemMessage": "You are ChatGPT, a large language model trained by OpenAI.",
          "character": null,
          "chatID": "48125eea-5655-4184-8ef7-1f0f29f2b612",
          "updatedAt": "2023-03-11T02:57:23.913Z",
          "preview": "I love AI very much.",
          "id": "48e25eea-5655-4184-8ef7-1f0f29f2b612",
          "title": "(Example) Fix grammar errors",
          "favoritedAt": "2023-04-10T07:59:36.335Z"
        },
        {
          "messages": null,
          "chatTitle": "(Example) Fix grammar errors2",
          "model": "gpt-3.5-turbo",
          "systemMessage": "You are ChatGPT, a large language model trained by OpenAI.",
          "character": null,
          "chatID": "18125eea-5655-4184-8ef7-1f0f29f2b612",
          "updatedAt": "2023-03-11T02:57:23.913Z",
          "preview": "I love AI very much.",
          "id": "18e25eea-5655-4184-8ef7-1f0f29f2b612",
          "title": "(Example) Fix grammar errors",
          "favoritedAt": "2023-04-11T07:59:36.335Z"
        },
        {
          "messages": null,
          "chatTitle": "(Example) Fix grammar errors3",
          "model": "gpt-3.5-turbo",
          "systemMessage": "You are ChatGPT, a large language model trained by OpenAI.",
          "character": null,
          "chatID": "28125eea-5655-4184-8ef7-1f0f29f2b612",
          "updatedAt": "2023-03-12T02:57:23.913Z",
          "preview": "I love AI very much.",
          "id": "28e25eea-5655-4184-8ef7-1f0f29f2b612",
          "title": "(Example) Fix grammar errors",
          "favoritedAt": "2023-04-12T07:59:36.335Z"
        },
        {
          "messages": null,
          "chatTitle": "(Example) Fix grammar errors4",
          "model": "gpt-3.5-turbo",
          "systemMessage": "You are ChatGPT, a large language model trained by OpenAI.",
          "character": null,
          "chatID": "38125eea-5655-4184-8ef7-1f0f29f2b612",
          "updatedAt": "2023-03-13T02:57:23.913Z",
          "preview": "I love AI very much.",
          "id": "38e25eea-5655-4184-8ef7-1f0f29f2b612",
          "title": "(Example) Fix grammar errors",
          "favoritedAt": "2023-04-13T07:59:36.335Z"
        },
        {
          "messages": null,
          "chatTitle": "(Example) Fix grammar errors4",
          "model": "gpt-3.5-turbo",
          "systemMessage": "You are ChatGPT, a large language model trained by OpenAI.",
          "character": null,
          "chatID": "38125eea-5655-4184-8ef7-1f0f29f2b612",
          "updatedAt": "2023-03-13T02:57:23.913Z",
          "preview": "I love AI very much.",
          "id": "38e25eea-5655-4184-8ef7-1f0f29f2b612",
          "title": "(Example) Fix grammar errors",
          "favoritedAt": "2023-04-13T07:59:36.335Z"
        },
        {
          "messages": null,
          "chatTitle": "(Example) Fix grammar errors5",
          "model": "gpt-3.5-turbo",
          "systemMessage": "You are ChatGPT, a large language model trained by OpenAI.",
          "character": null,
          "chatID": "58125eea-5655-4184-8ef7-1f0f29f2b612",
          "updatedAt": "2023-03-13T02:57:23.913Z",
          "preview": "I love AI very much.",
          "id": "58e25eea-5655-4184-8ef7-1f0f29f2b612",
          "title": "(Example) Fix grammar errors",
          "favoritedAt": "2023-04-15T07:59:36.335Z"
        },
        {
          "messages": null,
          "chatTitle": "(Example) Fix grammar errors6",
          "model": "gpt-3.5-turbo",
          "systemMessage": "You are ChatGPT, a large language model trained by OpenAI.",
          "character": null,
          "chatID": "68125eea-5655-4184-8ef7-1f0f29f2b612",
          "updatedAt": "2023-03-13T02:57:23.913Z",
          "preview": "I love AI very much.",
          "id": "68e25eea-5655-4184-8ef7-1f0f29f2b612",
          "title": "(Example) Fix grammar errors",
          "favoritedAt": "2023-04-16T07:59:36.335Z"
        },
        {
          "messages": null,
          "chatTitle": "(Example) Fix grammar errors7",
          "model": "gpt-3.5-turbo",
          "systemMessage": "You are ChatGPT, a large language model trained by OpenAI.",
          "character": null,
          "chatID": "78125eea-5655-4184-8ef7-1f0f29f2b612",
          "updatedAt": "2023-03-13T02:57:23.913Z",
          "preview": "I love AI very much.",
          "id": "78e25eea-5655-4184-8ef7-1f0f29f2b612",
          "title": "(Example) Fix grammar errors",
          "favoritedAt": "2023-04-17T07:59:36.335Z"
        },
        {
          "messages": null,
          "chatTitle": "(Example) Fix grammar errors8",
          "model": "gpt-3.5-turbo",
          "systemMessage": "You are ChatGPT, a large language model trained by OpenAI.",
          "character": null,
          "chatID": "88125eea-5655-4184-8ef7-1f0f29f2b612",
          "updatedAt": "2023-03-18T02:57:23.913Z",
          "preview": "I love AI very much.",
          "id": "88e25eea-5655-4184-8ef7-1f0f29f2b612",
          "title": "(Example) Fix grammar errors",
          "favoritedAt": "2023-04-18T07:59:36.335Z"
        }
      ]
      conversationList = conversationList.sort((a,b) => b.isFolder - a.isFolder)

    return (

    )
}