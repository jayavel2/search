import React from 'react';
import axios from 'axios';

class Search extends React.Component {
  constructor(){
    super();
    this.state={
      search:'',
      list:[]
    }
   this.validate=this.validate.bind(this);
  }
  onChange(event){
    const name    = event.target.name
    const value   = event.target.value;
    this.setState({search:value})
  }
  validate(){
    var search  = this.state.search;
    const axiosthis=this
    const apiUrl = `https://api.edamam.com/search?app_id=900da95e&app_key=40698503668e0bb3897581f4766d77f9&q=${search}`;
    axios.get(apiUrl,{})
    .then(function (response) {
    // handle success
     axiosthis.setState({list:response.data.hits})
    })
    .catch(function (error) {
      // handle error
      console.log(error);
  })
  }
  
  render(){
    var list         = this.state.list;
    var searchlist   = []
    
    for (var i=0;i<list.length;i++){
      searchlist.push(
          <tbody>
            <tr>
              <td>{i+1}</td>
              <td>{<img src={list[i].recipe.image} style={{width:"145px",height:"160px"}}/>}</td>
              <td><a href={list[i].recipe.url}>{list[i].recipe.url}</a></td>
              <td>{list[i].recipe.healthLabels}</td>
              <td>{list[i].recipe.ingredientLines}</td>  
              <td>{list[i].recipe.calories}</td>
            </tr>
          </tbody>
      )
  }
    return (
      <div className="container">
      <center><h2>EDAMAM RECEIPE SEARCH</h2></center><br/>
      <form className="example">
          <input type="text" placeholder="Search.." name="search" value={this.state.search} onChange={(e)=>this.onChange(e)} />
          <button type="button"  onClick={this.validate}><i className="fa fa-search"></i></button>
        </form>
       <br/><br/>  
       <table className="table table-bordered">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Image</th>
              <th>URL</th>
              <th>HealthLabels</th>
              <th>IngredientLines</th>
              <th>Calories</th>
            </tr>
          </thead>      
          {searchlist}
      </table>
    </div>
  );
}
}
export default Search;