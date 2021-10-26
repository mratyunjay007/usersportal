import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { connect } from 'react-redux';
import { deleteUser, getUsers, updateUser, createUser } from './redux/actions/users';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Users1 from './Images/users1.png';
import { withStyles } from '@mui/styles';
import Loader from "react-loader-spinner";
import {truncateString} from './lib';


const styles = (theme) => ({
    imgContainer: {
        width: 250,
        height: 250,
        overflow: 'hidden',
        borderRadius: '50%',
        cursor: 'pointer',
        backgroundColor: '#e6e6e6',
        position: 'relative'
    },
    imageStyle: {
        width: '100%',
        height: '100%',
    },

    addIcon: {
        display: 'flex',
        width: '100%',
        height: '100%',
        position: "absolute",
        top: '0%',
        left: '0%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        opacity: 0,
        '&:hover': {
            opacity: '1',
            backgroundColor: '#3c48584f'
        }
    },
});

class UsersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            operation: '',
            user: '',
            loader:true,
        }

        this.uploadDp = React.createRef();
    }

    componentDidMount = () => {
        this.setState({loader:true});
        this.props.getUsers().then(this.setState({loader:false}));
    }

    handleClose = () => {
        this.setState({ open: false, user: '', operation: '', first_name: '', last_name: '', email: '',avatar:'' });
    }

    performOperation = () => {
        const { operation, user,first_name,last_name,email,avatar } = this.state;
        if(first_name && last_name && email && avatar){
        const payload = { first_name: this.state.first_name, last_name: this.state.last_name, email: this.state.email,avatar:this.state.avatar };


        this.setState({loader:true});
        if (operation === "edit") {
            payload.id = user.id;
         this.props.updateUser(payload).then(this.setState({loader:false}));
        } else {
            this.props.createUser(payload).then(this.setState({loader:false}));
        }
        this.handleClose();
    }else{
        window.alert("Please fill all fields including image");
    }
    }

    render() {
        const { open, user, operation,avatar } = this.state;
        const { classes } = this.props;
        return (
            <div>

              <Button variant="contained" onClick={()=>this.setState({operation:"addNewUser", open:true})}> ADD NEW USER </Button> 
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={this.handleClose}
                    closeAfterTransition
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '10%', backgroundColor: "#fff", borderRadius: 10, width: 400, padding: 20 }}>
                            <div style={{ backgroundColor: "#fff", display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300, }}>
                                <div className={classes.imgContainer} onClick={() => this.uploadDp.click()}>
                                    <img className={classes.imageStyle} src={avatar?avatar: ''} alt="" crossOrigin="anonymous" />
                                    <div className={classes.addIcon} >
                                        <p style={{ color: "#fff", fontWeight: '400' }}>Update User Image</p>
                                    </div>
                                    <input
                                        accept="image/*"
                                        type="file"
                                        ref={(ref) => (this.uploadDp = ref)}
                                        disableUnderline
                                        onChange={(e) => {
                                            let url = URL.createObjectURL(e.target.files[0]); console.log("file",url);
                                            this.setState({ avatar:url  });
                                        }}
                                        style={{ display: "none" }}
                                    />
                                </div>
                            </div>
                            <TextField
                                required
                                id="outlined-required"
                                label="First Name"
                                defaultValue={operation === "edit" ? user.first_name : ''}
                                onChange={(e) => this.setState({ first_name: e.target.value })}
                                style={{ margin: 10 }}
                            />
                            <TextField
                                required
                                id="outlined-required"
                                label="Last Name"
                                defaultValue={operation === "edit" ? user.last_name : ''}

                                onChange={(e) => this.setState({ last_name: e.target.value })}
                                style={{ margin: 10 }}
                            />

                            <TextField
                                required
                                id="outlined-required"
                                label="Email"
                                defaultValue={operation === "edit" ? user.email : ''}
                                onChange={(e) => this.setState({ email: e.target.value })}
                                style={{ margin: 10 }}
                            />

                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>
                                <Button color="warning" variant="contained" size="small" onClick={this.handleClose}> Cancel</Button>
                                <Button size="small" variant="contained" onClick={this.performOperation}>{operation === "edit" ? "Update User" : "ADD User"}</Button>
                            </div>
                        </div>
                    </div>
                </Modal>
                <div style={{ flexDirection: 'row' }}>
                    
                {this.state.loader?
                    <Loader
                         style={{ margin: "auto" }}
                                type="Circles"
                                color="#00BFFF"
                                height={400}
                                width={200}
                            />
                            :null}
                    {
                    this.props.users.map((user) => (
                        <Card sx={{ width: 250, maxWidth: 345, margin: 5, display: 'inline-block' }} >
                            <CardMedia
                                component="img"
                                height="140"
                                image={user.avatar ? user.avatar : Users1}
                                alt={user.first_name}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                   {truncateString(user.first_name,15)} {truncateString(user.last_name,15)}                                  </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {user.email}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => this.setState({ operation: 'edit', open: true, user,avatar:user.avatar,first_name:user.first_name,last_name:user.last_name,email:user.email })}>Edit</Button>
                                <Button size="small" onClick={() =>{
        this.setState({loader:true});
         this.props.deleteUser({ id: user.id }).then(this.setState({loader:false}))}}>Delete</Button>
                            </CardActions>
                        </Card>
                    ))}
                </div> 
            </div>
        );
    }
}

const mapStatetoProps = (state) => {
    return {
        users: state.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUsers: getUsers(dispatch),
        createUser: createUser(dispatch),
        updateUser: updateUser(dispatch),
        deleteUser: deleteUser(dispatch)
    }
}

export default withStyles(styles)(connect(mapStatetoProps, mapDispatchToProps)(UsersList));