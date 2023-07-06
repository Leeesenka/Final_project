import React from 'react';
import './MainPage.css'
import Login from './Login';
import fsm from './image/fsm.png'; 
import Register from './Register';
import logo from './image/—Pngtree—3d logo design vector cdr_5883019.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSuitcase, faMoneyCheckDollar, faScroll, faStar, faMobileScreenButton, faPeopleArrows} from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faTwitter, faFacebook} from "@fortawesome/free-brands-svg-icons";




const MainPage = () => {
 

  return (
    <div className='main'>
      <div className="main1">
        <div className='main-left'>
          <h2>Field service management software</h2>
          <h1>Get booked. Get paid. Repeat.</h1>
          <p>Book more jobs, get paid faster, and manage your entire business on the go. Try vcita’s all-in-one app for free.</p>
          <Login />
        </div>
        <div className='main-right'>
          <img src={fsm}></img>
        </div>
      
      </div>
      <div className='main2'>
        <div className='photo-left'>
        <video src='https://lp.vcita.com/wp-content/uploads/lp/2021/06/sider1_1_opt.mp4' controls autoPlay loop muted></video>
        </div>
        <div className='text-right'>
          <h1>We’ll handle the logistics, so you can focus on what you do best: getting the job done</h1>
          <h3>Streamline and automate your most tedious and time-consuming administrative tasks: from online job booking and schedule management, to contactless payment collection and client follow-ups.</h3>
        </div>
      </div>
      <div className='main3'>
        <h2>Spend less time in the office and more time in the field</h2>
        <div className='boxes1'>
            <div className='box1'>
            <FontAwesomeIcon id='icon1' icon={faSuitcase} />
            <h2>Book jobs while you work</h2>
            <p>Let your clients discover, book, and pay for jobs while while you’re working.</p>
            </div>
            <div className='box1'>
            <FontAwesomeIcon icon={faMoneyCheckDollar} color='#7FFFD4'/>
            <h2>Get paid on the spot</h2>
            <p>Easily collect payments from any mobile device, no need for fancy hardware!</p>
            </div>
            <div className='box1'>
            <FontAwesomeIcon icon={faScroll} color='#FFB6C1'/>
            <h2>Estimates and invoices on the go</h2>
            <p>Generate estimates and invoices in seconds from a lightweight mobile app that goes everywhere with you.</p>
            </div>
        </div>
        <div className='boxes1'>
        <div className='box1'>
            <FontAwesomeIcon icon={faStar} color='#F0E68C'/>
            <h2>Book jobs while you work</h2>
            <p>Let your clients discover, book, and pay for jobs while while you’re working.</p>
            </div>
            <div className='box1'>
            <FontAwesomeIcon icon={faMobileScreenButton} />
            <h2>Get paid on the spot</h2>
            <p>Easily collect payments from any mobile device, no need for fancy hardware!</p>
            </div>
            <div className='box1'>
            <FontAwesomeIcon icon={faPeopleArrows}color='#7FFFD4' />
            <h2>Estimates and invoices on the go</h2>
            <p>Generate estimates and invoices in seconds from a lightweight mobile app that goes everywhere with you.</p>
            </div>
        </div>
      </div>
      <div className='main4'>
   
          <div className='text-gard'>
              <h1>Get customer satisfaction that boosts your bottom line</h1>
              <p>Put our field support services to work for you with our customer-focused world-class support that can improve your CSAT score and build new efficiencies in your workflow.
              </p>
              <div className='line1'>

              </div>
          </div>
          <div className='box-gard1'>
            <div className='box-g1'>
              <h3>Solve for the customer</h3>
              <div className='line'>
                
              </div>
              <p>
                  Our highly skilled brand specialists know that customer satisfaction can change the game. We implement omnichannel strategies to support your field representatives, improve sales velocity, and deliver happy, satisfied customers.
              </p>
              
            </div>
            <div className='box-g1'>
              <h3>Scale your efforts</h3>
              <div className='line'>
                
              </div>
              <p>Our field support services aim to centralize functions across customer engagement so your team isn’t stretched so thin. Through deliverables like first-contact resolution and speedy ramp times, our strategies act as force-multipliers for territory managers.</p>
            </div>
         
        </div>
        <div className='box-gard2'>
            <div className='box-g1'>
              <h3>Get real-time data insights</h3>
              <div className='line'>
                
              </div>
              <p>With our advanced CRM technology, we provide research, briefings, inventory information, pricing details, promo details, and more. Use our analytics to accomplish prescriptive modeling, improve forecasting and routing, and understand your customer base</p>
            </div>

            </div>
      </div>
      <div className='main5'>
        <div className='blue'>
        <div className='photo-girl'>
          <img src='https://www.globalresponse.com/wp-content/uploads/elementor/thumbs/contact-center-solution-q8k8xuhj5eys690ma4meydv6fnkkcg0rzameeh28mk.jpg'></img>
        </div>
        <div className='text-after-girl'>
          <h1>A contact center solution for better business performance</h1>
          <p>Customer satisfaction is a differentiator in the field services industry. You need a solution that delivers key insights, helps scale your team, and delivers happy customers.</p>
      
        </div>
        </div>
      </div>
      <div className='main6'>
        <h1>Register to access the free trial version of the system</h1>
        <div className='line3'>

        </div>
        <p>Schedule a call today.</p>
        <Register/>
      </div>
      <div className='main7'>
        <div className='footer'>
        <div className='logo-down'>
            <img src={logo}></img>
        </div>
        <ul id='about'>
          <li>About</li>
          <li>Careers</li>
          <li>Contact Us</li>
          <li>Employee Requests</li>
        </ul>
        <ul id='solutions'>
          <li>Solutions</li>
          <li>Services</li>
          <li>Industrues</li>
          <li>Tech Solutions</li>
        </ul>
        <div className='inst'>
        <FontAwesomeIcon icon={faInstagram} />
        </div>
        <div className='twitter'>
        <FontAwesomeIcon icon={faTwitter} />
        </div>
        <div className='facebook'>
        <FontAwesomeIcon icon={faFacebook} />
        </div>
      
        </div>
        <div className='footer-down'>
          <p>© 2023 Global Response. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default MainPage;