import React, { useState, useEffect } from 'react'
import './time.css'



const Time = () => {

    const locale = 'fa';
    const [today, setDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date());
        }, 60 * 1000);
        return () => {
            clearInterval(timer);
        }
    }, []);

    const day = today.toLocaleDateString(locale, { weekday: 'long' });
    const date = ` ${today.toLocaleDateString('fa-IR').split('').splice(8, 9).join('')} - ${ today.toLocaleDateString(locale, { month: 'long' })}`;
    
    const hour = today.getHours();
    const wish = (hour < 12 && 'صبح بخیر') || (hour < 17 && 'ظهر بخیر') || 'عصر بخیر';

    const time = today.toLocaleTimeString(locale, { hour: 'numeric', hour12: false, minute: 'numeric' });

    


    return (
        <div className='timeCard'>
            <h5 className='time'>{time}</h5>
            <h5 className='day'>{day}</h5>
            <h5 className='date'>{date}</h5>
            {/* <h5>{wish}</h5> */}
        </div>
    )
}

export default Time