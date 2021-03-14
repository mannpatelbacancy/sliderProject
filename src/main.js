import React, { Component } from 'react';
import SideDrawer from './SideDrawer/SideDrawer';

class Main extends Component {
    state = {
        slider: false,
        data: {
            name: '',
            email: '',
            city: '',
            id:''

        },
        editDataSave:false,
        id:'',
        editData: '',
        personData: [],
        userBtnDisabled: false,
        buttonDisabled: false

    }

    addingData = props => {
        this.setState({ slider: true });
    }

    changed = (event) => {
       
        let id = event.target.id;
        let value = event.target.value;
        let copyData = { ...this.state.data };
        copyData[id] = value;
        this.setState({ data: copyData })
    }
   
   cancelData = () => {
        this.setState({ slider: false })
    }
    
    dataHandler = (id) => {
        if (id==='') {
            
            let rid = Math.round(Math.random() * 100,2);
            let copyData = { ...this.state.data }
            
            let name=copyData.name;
            let email=copyData.email;
            let city=copyData.city;
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;


            if(name.length<5){
                alert("name is not valid pl enter more than 5 characters");
            }
            else if(!pattern.test(email)){
                alert("email is not valid");
            }
            else if(city.length<2){
                alert("city is not valid")
            }
            else{
                let obj = {
                    id: rid,
                    name: copyData.name,
                    email: copyData.email,
                    city: copyData.city
                }
                let copyPersonData = [...this.state.personData];
                copyPersonData.push(obj);
                copyData.name = '';
                copyData.city = '';
                copyData.email = '';
                console.log("data "+JSON.stringify(copyPersonData));
                this.setState({ personData: copyPersonData, data: copyData, slider: false,id:''});

            }


            
        }
        else {
            
          
            let copyData = { ...this.state.data }
            
            let name=copyData.name;
            let email=copyData.email;
            let city=copyData.city;
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;


            if(name.length<5){
                alert("name is not valid pl enter more than 5 characters");
            }
            else if(!pattern.test(email)){
                alert("email is not valid");
                
            }
            else if(city.length<2){
                alert("city is not valid")
            }
            else{
                    
                let personData = [...this.state.personData];
                
                let copyData = '';
                for (let key in personData) {
                    if (personData[key].id === id) {
                    copyData = personData[key];
                    break;
                 }
                }
                let data = { ...this.state.data }
                copyData.name = data.name;
                copyData.email = data.email;
                copyData.city = data.city;
                data.name='';
                data.email='';
                data.city='';
                this.setState({ personData: personData, data:data,slider: false,id:'' })

            }
        
        
    }
}
    deleteHandler = (dataid) => {
        let data = [...this.state.personData];
        let ans = window.confirm('Are u Sure Want to delete');
        if (ans) {
            let updatedData = data.filter(x => x.id !== dataid);
            this.setState({ personData: updatedData })
        }


    }

  
    closeSideDrawer = () => {
        this.setState({ slider: false })
    }

    editHandler=(id)=>{
        let data = { ...this.state.personData };
        let temp = { ...this.state.data };
            alert("edit start id = "+id)
        let copyData = '';
        for (let key in data) {
            if (data[key].id === id) {
                copyData = data[key];
                break;
            }
        }
        temp.name = copyData.name;
        temp.city = copyData.city;
        temp.email = copyData.email;
        this.setState({ slider: true, editData: copyData, data: temp,id:id});
    }

    
    render() {
        let table = this.state.personData.map((person) => (
            <tr key={person.id}>
                <td>{person.name}</td>
                <td>{person.email}</td>
                <td>{person.city}</td>
                <td><button className="btn btn-success" onClick={() => this.editHandler(person.id)}>Edit</button></td>
                <td><button className="btn btn-danger" onClick={() => this.deleteHandler(person.id)}> Delete</button></td>
            </tr>



        ))
        ;

        return (
            <React.Fragment>
               
                <div>
                    <table className="table table-dark">
                        <thead>
                            <tr>
                                <th>User Name</th>
                                <th>Email Id</th>
                                <th>City</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {table}
                        </tbody>

                    </table>
                </div>
                <SideDrawer open={this.state.slider}>
                    
                    <div id="error"></div>
                    <h2>
                        <button className="btn btn-danger" style={{ position: 'absolute', top: '0', left: '0', margin: '10px' }} onClick={this.cancelData}>X</button></h2>
                    <form id="form" ><br />
                        <input type="text" id="name" className="form-control my-2" value={this.state.data['name']} required placeholder="enter the name" onChange={this.changed} />
                        <input type="email" id="email" className="form-control my-2" value={this.state.data['email']} required placeholder="enter the Email" onChange={this.changed} />
                        <input type="text" id="city" className="form-control my-2" value={this.state.data['city']} required placeholder="enter the City" onChange={this.changed} />
                        </form>
                    <center><button  className="btn btn-success mx-5" onClick={()=>this.dataHandler(this.state.id)}>Save</button></center>
                    
                </SideDrawer>


                <center><button className="btn btn-danger my-5" onClick={this.addingData}>Add User</button></center>
            </React.Fragment>
        );
    }
}



export default Main;