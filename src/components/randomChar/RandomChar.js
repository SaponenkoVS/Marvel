import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessege from '../errorMessege/errorMessege';
import MarvelService from '../../servises/MarvelService';

class RandomChar extends Component{
    constructor(props){
        super(props);
        this.updateChar();
    }

    state = {
        char:{},
        loading : true,
        error: false
    }

   marvelService = new MarvelService();
   onCharLoaded=(char)=>{
    this.setState({char,loading: false});
   }
   

   onError=()=>{
        this.setState({
            loading : false,
            error : true
        }) 
         
   }


   onLoading=()=>{
    this.setState({
        loading : true,
    }) 
     
}


   updateChar =()=>{
    let id  = Math.floor(Math.random()*(1011400 - 1011000)+ 1011000);
    this.onLoading();
     this.marvelService
       .getCharecter(id)
       .then(this.onCharLoaded)
       .catch(this.onError)
   }

 render(){
    let {char, loading,error} = this.state;
    let errorMessege = error? <ErrorMessege/>:null
    let spinner = loading ? <Spinner/> : null
    let content = !(loading || error) ?  <View char = {char}/> : null
    let update = this.updateChar;

    
    return (
        <div className="randomchar">
           {errorMessege}
           {spinner}
           {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main">
                    <div className="inner" onClick={update}>try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
 }
}
let View = ({char})=>{
    let imgStyle = {'objectFit' : 'cover'};
    if (char.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'unset'};}
    let {name,description,thumbnail,homePage,wiki}=char
 return (
    <div className="randomchar__block">
    <img src={thumbnail} alt="Random character" className="randomchar__img" style={imgStyle}/>
    <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{description}</p>
        <div className="randomchar__btns">
            <a href={homePage} className="button button__main">
                <div className="inner">HomePage</div>
            </a>
            <a href={wiki} className="button button__secondary">
                <div className="inner">Wiki</div>
            </a>
        </div>
     </div>
    </div>
    )
    }
export default RandomChar;