import Footer from "@/components/main/Footer"
import Navbar from "@/components/main/Navbar"
import StarsCanvas from "@/components/main/StarBackground"

export default function MainLayout({children}){
return(
    <div className="bg-[#030014] overflow-y-scroll overflow-x-hidden">
    <StarsCanvas/>
    <Navbar/>
    <main className="h-full w-full">
    {children}
    </main>
    <Footer/>
    </div>
)
}