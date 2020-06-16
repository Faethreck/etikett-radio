import React, { useState, useContext } from 'react';
import { Context } from "./Context";
import { useAlert } from 'react-alert';
import { Redirect } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import noisyEtikettRadioLogo from './img/imageonline-co-noise.png';


export default function Contact() {
    const context = useContext(Context);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);


    const alert = useAlert();

    const handleSubmit = e => {
        e.preventDefault();
        setLoading(true);

        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ name, email, subject, message })
        }

        fetch('http://localhost:3000/users/contact', options)
            .then(res => res.json())
            .then(data => {
                setLoading(false);
                if (data.success) {
                    setName('');
                    setEmail('');
                    setSubject('');
                    setMessage('');
                    alert.success('Your message has been sent!',
                        {
                            onClose: () => {
                                setRedirect(true);

                            },
                            onClick: console.log("working")
                        });
                } else {
                    alert.error('Something went wrong... Please contact an admin', { onClick: console.log("working") });
                }
            })
    }

    if (redirect) return <Redirect to='/' />

    return (
        <DocumentTitle title="Contact page">
            <div className={`${context.gapClass} input-form`}>

                <h2 id="main">contact</h2>
                <form onSubmit={handleSubmit} role="contact-form" >
                    <div className="grid-container">
                        <label htmlFor="name">
                            <span className="required">*</span>name
                    <input required type="text" id="name" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
                        </label>
                        <label htmlFor="email">
                            <span className="required">*</span>email
                    <input required type="email" id="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </label>
                        <label htmlFor="subject">
                            <span className="required">*</span>subject
                    <input required type="text" id="subject" placeholder="subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
                        </label>
                        <label className="describe" htmlFor="message">
                            <span className="required">*</span>message
                    <textarea required type="text" id="message" placeholder="Hey, whats up?" value={message} onChange={(e) => setMessage(e.target.value)} />
                        </label>
                    </div>
                    <div className="submit-button">
                        <input type="submit" value="send" role='button' /><span className="required">* required</span>
                    </div>
                </form>
            </div>

        </DocumentTitle>

    )
}
