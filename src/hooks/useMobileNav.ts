// src/hooks/useMobileNav.ts
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from "react";

export const useMobileNav = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [isNavOpen, setIsNavOpen] = useState(false);

    const openCloseNav = () => setIsNavOpen(!isNavOpen);

    useEffect(() => {
      const getOflow = (hidden: boolean) => `overflow-${hidden ? 'hidden': 'auto'}`
      const setOflow = (hidden: boolean) => {
        const classList = [...document.body.classList]
        const classOflow = getOflow(hidden)
        if (!classList.includes(classOflow)) {
          document.body.classList.add(classOflow)
        }
        const oppositeClass = getOflow(!hidden)
        if (classList.includes(oppositeClass)) {
          document.body.classList.remove(oppositeClass)
        }
      }
      setOflow(isNavOpen)
      return () => setOflow(false)
    }, [isNavOpen])

    const handleRedirect = (path: string) => {
        setIsNavOpen(false);
        
        // Define which paths should always use hash-based navigation
        const alwaysHashPaths = ['quem_somos', 'especialistas'];
        
        if (alwaysHashPaths.includes(path)) {
            // These sections only exist on front page, so always use hash
            if (pathname !== '/') {
                router.push('/#' + path);
            } else {
                window.location.hash = path;
            }
        } else {
            // For blog and ebook, use direct navigation
            router.push(`/${path}`);
        }
    };

    return {
        isNavOpen,
        openCloseNav,
        handleRedirect,
    }
}