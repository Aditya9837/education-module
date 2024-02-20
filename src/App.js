import { Routes,Route } from "react-router-dom";
import Header from "./component/Header";
import HomePage from "./component/HomePage";
import AboutPage from "./component/AboutPage";
import ContactPage from "./component/ContactPage";
import SignInForm from "./component/SignInForm";
import SignUpForm from "./component/SignUpForm";
import AllCoursesPage from "./component/AllCourses";
import Payment from "./component/Payment";
import CongratulationsPage from "./component/Congrates";
import UserProfile from "./component/UserProfile";
import Enrolled from "./component/Enrolled";


function App() {
  return (
    <>
    <Header/>
    <Routes>
      <Route path="/" element={<HomePage></HomePage>}></Route>
      <Route path="/about" element={<AboutPage></AboutPage>}></Route>
      <Route path="/contact" element={<ContactPage></ContactPage>}></Route>
      <Route path="/signin" element={<SignInForm></SignInForm>}></Route>
      <Route path="/signup" element={<SignUpForm></SignUpForm>}></Route>
      <Route path="/courses" element={<AllCoursesPage></AllCoursesPage>}></Route>
      <Route path="/payment" element={<Payment></Payment>}></Route>
      <Route path="/congrates" element={<CongratulationsPage></CongratulationsPage>}></Route>
      <Route path="/enrolled" element={<Enrolled></Enrolled>}></Route>
    </Routes>
    </>
  );
}

export default App;
