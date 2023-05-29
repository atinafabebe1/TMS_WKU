import { useEffect, useState } from 'react';
import api from '../../../api/api';
import { useAuth } from '../../../context/AuthContext';
import { Container, Row, Col, Card, Form, Button, Image } from 'react-bootstrap';
import { FaPlusCircle, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaKey, FaCar } from 'react-icons/fa';
import Avatar from 'react-avatar';

function UserProfile() {
  const { user } = useAuth();
  const [photo, setPhoto] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  async function fetchUser() {
    const response = await api.get(`/user/me/${user.id}`);
    console.log(response);
    setUserInfo(response.data);
  }
  useEffect(() => {
    fetchUser();
    console.log(user);
  }, []);
  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const response = await api.get(`/user/${userInfo.image?.photo}/image`, {
          responseType: 'arraybuffer'
        });
        const blob = new Blob([response.data], {
          type: 'image/jpeg'
        });
        const url = URL.createObjectURL(blob);
        setPhoto(url);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPhoto();
  }, [userInfo]);

  const handleChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };
  const handlePhotoChange = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('photo', file);
    console.log('Photo sending');
    console.log(userInfo.id);
    try {
      await api.put(`/user/${userInfo?.id}/image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      // reload the user info and photo
      fetchUser();
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmNewPassword) {
      setErrorMessage('New passwords and confirm password do not match.');
    } else {
      try {
        await api.put('/user/updatePassword', {
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword
        });
        setPasswordForm({
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: ''
        });
        setErrorMessage('');
      } catch (error) {
        setErrorMessage(error.response.data.error);
      }
    }
  };

  return (
    <div className="user-profile-container">
      <Container>
        <Row className="my-4">
          <Col md={4} className="user-profile-card-col">
            <Card className="user-profile-card">
              <Card.Header className="bg-primary text-light">
                <FaUser /> Personal Information
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={3} className="user-profile-avatar-col">
                    <div className="user-profile-avatar-overlay">
                      <Avatar src={photo} name={`${userInfo?.firstName} ${userInfo?.lastName}`} size="150" round={true} className="mx-1" />
                      <label htmlFor="photo-upload" className="d-block">
                        <FaPlusCircle size="1.5em" />
                      </label>
                      <input id="photo-upload" type="file" onChange={handlePhotoChange} accept="image/*" style={{ display: 'none' }} />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={9} className="user-profile-info-col">
                    <div className="user-profile-info">
                      <strong>FullName:</strong>
                      {userInfo && `${userInfo.firstName} ${userInfo.lastName}`}
                      <br />
                      <strong>
                        <FaEnvelope /> Email:
                      </strong>{' '}
                      {userInfo && userInfo.email} <br />
                      <strong>
                        <FaPhone /> Phone Number:
                      </strong>{' '}
                      {userInfo && userInfo.phoneNumber} <br />
                      <strong>
                        <FaMapMarkerAlt /> Address:
                      </strong>{' '}
                      {userInfo && userInfo.address} <br />
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="user-profile-card-col">
            <Card className="user-profile-card">
              <Card.Header className="bg-primary text-light">
                <FaUser /> Account Information
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  <div className="user-profile-info">
                    <strong>
                      <FaUser /> Username:
                    </strong>{' '}
                    {userInfo && userInfo.userName} <br />
                    <strong>
                      <FaKey /> Role:
                    </strong>{' '}
                    {userInfo && userInfo.role} <br />
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          {userInfo && userInfo.driverinfo && (
            <Col md={4} className="user-profile-card-col">
              <Card className="user-profile-card">
                <Card.Header className="user-profile-card-header">
                  <FaCar /> Driver Information
                </Card.Header>
                <Card.Body>
                  <Card.Text>
                    <div className="user-profile-info">
                      {userInfo && userInfo.driverinfo ? (
                        <div>
                          <strong>
                            <FaCar /> License Plate:
                          </strong>{' '}
                          {userInfo.driverinfo.licensePlate} <br />
                          <strong>
                            <FaCar /> Car Make:
                          </strong>{' '}
                          {userInfo.driverinfo.carMake} <br />
                          <strong>
                            <FaCar /> Car Model:
                          </strong>{' '}
                          {userInfo.driverinfo.carModel} <br />
                          <strong>
                            <FaCar /> Car Color:
                          </strong>{' '}
                          {userInfo.driverinfo.carColor} <br />
                        </div>
                      ) : (
                        <p>You are not registered as a driver.</p>
                      )}
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          )}
          <Form onSubmit={handleSubmit} className="mx-auto my-4 w-md-50 w-100">
            <Form.Group controlId="currentPassword">
              <Form.Label>Current Password</Form.Label>
              <Form.Control type="password" name="currentPassword" value={passwordForm.currentPassword} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="newPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control type="password" name="newPassword" value={passwordForm.newPassword} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="confirmNewPassword">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control type="password" name="confirmNewPassword" value={passwordForm.confirmNewPassword} onChange={handleChange} required />
            </Form.Group>
            <Button type="submit">Save</Button>
          </Form>
        </Row>
      </Container>
    </div>
  );
}

export default UserProfile;
