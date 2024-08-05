import React, { useEffect } from 'react';

const WowWrapper = ({ children }) => {
    useEffect(() => {
        const initWow = async () => {
            const { WOW } = await import('wowjs');
            const wow = new WOW({
                boxClass: 'wow',
                animateClass: 'animated',
                offset: 0,
                mobile: true,
                live: true,
            });
            wow.init();
        };
        initWow();
    }, []);

    return <div>{children}</div>;
};

export default WowWrapper;
