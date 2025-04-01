// src/app/ebook/page.tsx
//ebook/page.tsx
import Formulario from "@/components/Sendmail/page";
import { Header } from "@/components/Header";
import  Footer  from "@/components/Footer"
import { NavColor } from "@/hooks/types";


const Page = () => {
    return (
        <>
            <Header positionColorRelation={{
                0: NavColor.dark,
                13: NavColor.light,
                34: NavColor.dark,
                42: NavColor.light,
                52: NavColor.dark,
                63: NavColor.light,
                65: NavColor.dark,
                78: NavColor.light,
            }} />
            <Formulario />
            <Footer />

        </>
    );
}
export default Page;