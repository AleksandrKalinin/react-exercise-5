import { useState, useEffect, useCallback, Fragment, useRef} from 'react';
import { Container, Row, Col, Table, Card, Button, Modal, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAlbums, getPhotos, addAlbum, addPhoto } from './actions/index';
import Portal from './Portal';

function Content() {

  const dispatch = useDispatch();
  const albumsList = useSelector(state => state.albumsArray.albums);
  const photosList = useSelector(state => state.photosArray.photos);

  useEffect(() => {
    dispatch(getAlbums())
  }, []);

  const [albums, setAlbums] = useState([]);
  const [isSuccesful, setStatus] = useState(false);

  const [photos, setPhotos] = useState([]);
  const [photosShown, openPhotos] = useState(false);

  const [currentAlbum, setCurrentAlbum] = useState(null);

  const [isOn, setOn] = useState(false); // toggles button visibility

  const [inputValue, setInputValue] = useState('');

  const [currentFunction, setCurrentFunction] = useState(null);

  useEffect(() => {
    setAlbums(albumsList);
    setStatus(true);
  }, [albumsList])

  useEffect(() => {
    if (isSuccesful === true) {
      openPhotos(true);
      setPhotos(photosList);      
    }
  }, [photosList])

  const showPhotos = (id) => {
    dispatch(getPhotos(id))
    setCurrentAlbum(id);
  }

  const callFunc = useCallback((item) => showPhotos(item.id), []);  

  const createAlbum = (name) => {
    const newItem = {};
    newItem.id = albumsList.length + 1;
    newItem.userId = newItem.id;
    newItem.title = name;
    newItem.photos = [];
    dispatch(addAlbum(newItem));
    setOn(false);
    setInputValue('');
  }

  const createPhoto = (name) => {
    const photo = {};
    photo.title = 'Lorem ipsum dolor sit ament';
    photo.url = 'token-image.jpg';
    photo.id = photosList.length + 1;
    dispatch(addPhoto(photo));
    setOn(false);
    setInputValue('');
  }

  const checkExecution = (e) =>{
    if ( e.target.id === 'albumButton' ) {
      setCurrentFunction(() => createAlbum);
    } else {
      setCurrentFunction(() => createPhoto);
    }
    setOn(true);
  }

  const refModal = useRef();
  useOnClickOutside(refModal, () => setOn(false));

  const refFooter = useRef();
  const scrollToTarget = () => refFooter.current.scrollIntoView();

  function useOnClickOutside(ref, handler) {
    useEffect(() => {
        const listener = (e) => {
          if (!ref.current || ref.current.contains(e.target)) {
            return;
          }
          handler(e);
        };
        document.addEventListener("click", listener);
        return () => {
          document.removeEventListener("click", listener);
        };
      },
      [ref, handler]
    );
  }
  return (
    <>
      <Container>
        { !photosShown ?
          <Row>
            <Col>
              {isSuccesful ?
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Title</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><Button onClick={scrollToTarget} className="styled-button">Scroll</Button></td>
                      <td></td>
                    </tr>                  
                    {albums.map((item, index) => 
                      <tr key={item.id} onClick = {showPhotos.bind(null, item.id)}>
                        <td>{item.id}</td>
                        <td>{item.title}</td>
                      </tr>
                    )}
                    <tr>
                      <td colSpan="2">
                        <Button onClick={checkExecution} id="albumButton" className="styled-button">Add new album</Button>
                      </td>
                    </tr>                      
                  </tbody>
                </Table>                    
                : <div>Loading...</div>}
            </Col>
          </Row>
        : null }
        { photosShown ?
          <Fragment>
            <Row>
              <Col md={12} lg={12} xs={12} style={{ justifyContent: 'center' }}>
                <Button onClick={() => openPhotos(false)} className="styled-button">Back to albums</Button>
              </Col>
              <Col md={12} lg={12} xs={12} style={{ justifyContent: 'center' }}>
                <p className="current-album">Photos for album {currentAlbum}</p>
              </Col>
              {photos.map((item) => 
                <Col md={4} lg={4} xs={4} key={item.id}>
                  <Card className="styled-card">
                    <Card.Img variant="top" src={item.url} />
                    <Card.Body>
                      <Card.Text>
                        {item.title}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              )}
            </Row>
            <Row>
              <Col md={12} lg={12} xs={12} style={{ justifyContent: 'center' }}>
                <Button onClick={checkExecution} id="photoButton" className="styled-button">Add photo</Button>
              </Col>            
            </Row>
          </Fragment>  
        : null }
        { isOn ? 
        <Portal>
          <div className="modal-wrapper">
            <Modal.Dialog aria-labelledby="contained-modal-title-vcenter" centered ref={refModal}>
              <Modal.Header closeButton>
                <Modal.Title>Modal title</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label className="form-label">Please add name of an album in the text field below</Form.Label>
                      <Form.Control key="2233" defaultValue = {inputValue} onChange={(e) => setInputValue(e.target.value)} type="text" placeholder="New item" />
                    </Form.Group>
                    <Button variant="primary" className="styled-button" onClick={currentFunction.bind(null, inputValue)} >
                      Save item
                    </Button>
                  </Form>
              </Modal.Body>
            </Modal.Dialog>          
          </div>
        </Portal> : null }
      </Container>
      <div className="footer" ref={refFooter}></div>
    </>  
  );
}

export default Content;
