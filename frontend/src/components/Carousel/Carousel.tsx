import Carousel from 'react-bootstrap/Carousel';
import basketball from '../../images/basketball.jpg';
import chess from '../../images/chess.jpg';
import coding from '../../images/coding.jpg';

function SlideShow() {
  return (
    <Carousel>
        <Carousel.Item>
            <a href="https://www.youtube.com/watch?v=OCSbzArwB10" target="_blank">
                <img 
                className="d-block w-100 rounded"
                    src={chess} 
                   
                />
            </a>
        
        
        <Carousel.Caption>
          <h3>Learn Chess</h3>
          <p>Click this video to learn chess</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <a href="https://www.youtube.com/watch?v=qqXedKDtQ2g" target="_blank"> <img
          className="d-block w-100 rounded"
          src= {basketball}
          style ={{"overflow": "hidden",}}
          alt=""

        /></a>
       

        <Carousel.Caption>
          <h3>Learn Basketball Tricks</h3>
          <p>Click here to develop your basketball skills!</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <a href="https://www.youtube.com/watch?v=BdBV-Cy9fNg" target="_blank">
            <img 
            className="d-block w-100 rounded" 
            src={coding}
            alt="Third slide"
            style={{
              "overflow": "hidden",
              "boxShadow": "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset"
              
          }}
            />
        </a>
        
        <Carousel.Caption>
          <h3>Learn To Program</h3>
          <p>
            Watch this video and try out coding!
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default SlideShow;