import React,{Component} from 'react';
import SideDrawer from './SideDrawer/SideDrawer';
import Modal from './Layout/Modal/Modal';
class Main extends Component{
    state={
        adding:false,
        slider:false,
        data:{
            name:'',
            email:'',
            city:'',
            id:''
            
        },
        editData:'',
        personData:[],
        isIdValid:false,
        isCityValid:false,
        isnameValid:false,
        buttonDisabled:false

    }
    

    saveData=()=>{
        let rid=Math.random()*100;
        let copyData={...this.state.data}
   
        let obj={
            id:rid,
            name:copyData.name,
            email:copyData.email,
            city:copyData.city
        }
        let copyPersonData=[...this.state.personData];
        
        copyPersonData.push(obj);
        copyData.name='';
        copyData.city='';
        copyData.email='';
 
        this.setState({personData:copyPersonData,adding:false,data:copyData,buttonDisabled:false});
        
    }
    // checkValidity=(id)=>{
        
      
        
    //      if(id==="name"){
    //         let name=this.state.data.name;
    //          let isIdValid=name.trim()!=='';
    //         this.setState({isnameValid:isIdValid});
    //         console.log("name"+this.state.isnameValid);
    //     }
    //     if(id==="email"){
    //         const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    //         let isEmailValid=pattern.test(this.state.data.email);
    //         this.setState({isEmailValid:isEmailValid});
    //     }
    //     if(id==="city"){
    //         let isCityValid=this.state.data.city.trim()!=='';
    //          this.setState({isCityValid:isCityValid});
    //     }
      
  

    // }
    changed=(event)=>{
        let id=event.target.id;
        let value=event.target.value;
        let copyData={...this.state.data};
        copyData[id]=value;
        this.setState({data:copyData})
        // console.log(this.state.data);
        // this.checkValidity(id);
        // let ans=false;
        
        
        // if(this.state.isCityValid&&this.state.isnameValid&&this.state.isEmailValid){
        //     ans=true;
        //     alert()
        // }
        // this.setState({buttonDisabled:ans});
    
    }
    addingData=props=>{
        this.setState({adding:true});
    }
    closeModal=()=>{
        this.setState({adding:false})
    }
    cancelData=()=>{
        this.setState({adding:false})
    }
    editHandler=(id)=>{
      
        let data={...this.state.personData};
        let temp={...this.state.data};

        let copyData='';
        for(let key in data){
            if(data[key].id===id){
               copyData=data[key];
                break;
            }
        }
        temp.name=copyData.name;
        temp.city=copyData.city;
        temp.email=copyData.email;
        this.setState({slider:true,editData:copyData,data:temp});
     

    }
    deleteHandler=(dataid)=>{
        let data=[...this.state.personData];
        let ans=window.confirm('Are u Sure Want to delete');
        if(ans){
            let updatedData=data.filter(x=>x.id!==dataid);
            this.setState({personData:updatedData})
        }
  

    }
    closeSideDrawer=()=>{
        this.setState({slider:false})
    }

    editSaveData=(id)=>{
       
         let personData=[...this.state.personData];
      
         let copyData='';
         for(let key in personData){
             if(personData[key].id===id){
                copyData=personData[key];
                 break;
             }
         }
        let  data={...this.state.data}
        copyData.name=data.name;
        copyData.email=data.email;
        copyData.city=data.city;
        this.setState({personData:personData,slider:false})
    }
    render(){
        let table=this.state.personData.map((person)=>(
            <tr key={person.id}>
                <td>{person.name}</td>
                <td>{person.email}</td>
                <td>{person.city}</td>
                <td><button className="btn btn-success" onClick={()=>this.editHandler(person.id)}>Edit</button></td>
                <td><button className="btn btn-danger" onClick={()=>this.deleteHandler(person.id)}> Delete</button></td>
            </tr>

            
            
        ))
      
       
        return(
        <React.Fragment>
            <SideDrawer open={this.state.slider}>
        <h2>Edit Data</h2>
            <input type="text"  id="name" className="form-control my-2"value={this.state.data['name']} required placeholder="enter the name"  onChange={this.changed} />
            <input type="email" id="email" className="form-control my-2" value={this.state.data['email']} required placeholder="enter the Email"  onChange={this.changed}/>
            <input type="text" id="city" className="form-control my-2"  value={this.state.data['city']} required placeholder="enter the City"  onChange={this.changed}/>
            <button className="btn btn-success"onClick={()=>this.editSaveData(this.state.editData.id)}>Save</button>   <button  className="btn btn-danger" onClick={()=>this.closeSideDrawer()}>CLose</button>   


        </SideDrawer>
            <div>
                <table className="table table-dark">
                <thead>
                     <tr>
                        <th>Firstname</th>
                        <th>Email</th>
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
            <div show={this.state.adding} close={this.closeModal}>
               


            </div>
        
           <Modal show={this.state.adding} close={this.closeModal}>
               <h2>Enter Data</h2><form>
            <input type="text"  id="name" className="form-control my-2" value={this.state.data['name']}required placeholder="enter the name"  onChange={this.changed}/>
            <input type="email" id="email" className="form-control my-2" value={this.state.data['email']} required placeholder="enter the Email" onChange={this.changed}/>
            <input type="text" id="city" className="form-control my-2"  value={this.state.data['city']} required placeholder="enter the City" onChange={this.changed}/>
            </form>
            <button className="btn btn-success mx-5" onClick={this.saveData}>Save</button>
            <button className="btn btn-primary mx-5" onClick={this.cancelData}>Cancel</button>


            </Modal> 

        
        <center><button className="btn btn-danger my-5" onClick={this.addingData}>Add User</button></center>
        </React.Fragment>
        );
    }
}



export default Main;