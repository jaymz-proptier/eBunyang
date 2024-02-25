import { useEffect, useRef, useState } from 'react';

const fixedContent = () => {
    const stickyRef = useRef(null);
    const [sticky, setSticky] = useState(null);
    const [offset, setOffset] = useState(0);

    // console.log(sticky);
    useEffect(() => {
        if (!stickyRef.current) {
            return;
        }
        setOffset(stickyRef.current.offsetTop);
    }, [stickyRef, setOffset]);

    useEffect(() => {
        const handleScroll = () => {
            if (!stickyRef.current) {
                return;
            } else {
                const stickyContent = document.getElementById("stickyContent");
                const stickyHeight = stickyContent.clientHeight;
                //   console.log(stickyHeight);
                const stickyBgContent = document.getElementById("stickyBgContent");
                const stickyBgHeight = stickyBgContent.clientHeight;

                // console.log('window.scrollY', window.scrollY);
                // console.log('stickyBgHeight', stickyBgHeight);
                // console.log('window.scrollY + stickyHeight', window.scrollY + stickyHeight);

                if ((window.scrollY + stickyHeight) - 177 > stickyBgHeight) {
                    setSticky("end");
                } else if (window.scrollY > offset) {
                    setSticky("sticky");
                } else {
                    setSticky(null);
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [setSticky, stickyRef, offset]);
    return { stickyRef, sticky };
};

export default fixedContent;