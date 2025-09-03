import Landing from "../pages/Landing/Landing";
import Hero from "../pages/Landing/Hero";
import Template from "../pages/Template";
import Explore from "../pages/Explore/Explore";
import Category from "../pages/Explore/Category";
import Profile from "../pages/Profile";
import Post from "../pages/Post";
import Message from "../pages/Messages/Message";
import ChatBot from "../pages/ChatBot";
import Clinic from "../pages/Clinic";
import Search from "../pages/Search";

const routes = [
    {
        path : '/',
        element : <Landing/>
    },
    {
        path : '/signup',
        element : <Hero/>
    },
    {
        path: '/',
        element: <Template />, 
        children: [
            {
                path: 'explore',
                element: <Explore />
            },
            {
                path: 'explore/:slug',
                element: <Category />
            },
            {
                path: 'profile/:userId',
                element: <Profile />
            },
            {
                path: 'post',
                element: <Post />
            },
            {
                path: 'clinic',
                element: <Clinic />,
            },
            {
                path: 'message',
                element: <Message />,
                children: [
                    {
                        path: ':receiverId',
                        element: <Message />
                    }
                ]
            },
            {
                path: 'chatbot',
                element: <ChatBot/>
            }, 
            {
                path: 'search',
                element: <Search/>
            }
        ]
    }
]

export default routes