import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

function ReactBigCalendar() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div className="App">
            <h2>Product List</h2>
            <ul style={{ display: 'flex', listStyleType: 'none', padding: 0 }}>
                {products.map(product => (
                    <li key={product.id} style={{ marginRight: '20px' }}>
                        <strong>{product.name}</strong>
                        <ul style={{ margin: 0 }}>
                            <li>{product.price}</li>
                        </ul>
                    </li>
                ))}
            </ul>
            <Calendar
                localizer={localizer}
                // events={myEventsList} // Uncomment and define your events
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
            />
        </div>
    );
}

export default ReactBigCalendar;
