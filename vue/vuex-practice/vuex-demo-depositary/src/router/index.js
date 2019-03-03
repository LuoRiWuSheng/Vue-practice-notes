const App = () =>import("../App.vue")
const Home = ()=> import("../pages/Home.vue")
const Count = ()=> import("../pages/Count.vue")

const routes = [
	{
		path: "/",
		redirect: "/count"
	},
	{
		path: "/home",
		component: Home 
	},
	{
		path: "/count",
		component: Count
	}
]



export default routes

