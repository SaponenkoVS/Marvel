import './charInfo.scss';
import{useState, useEffect, useRef} from 'react';
import MarvelService from '../../servises/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessege from '../errorMessege/errorMessege';
import Skeleton from '../skeleton/Skeleton'

let CharInfo =(props)=> {

let [char,setChar]=useState(null);
let [loading,setLoading]=useState(false);
let [error,setError]=useState(false);
    

   let  marvelserice = new MarvelService();
    


     useEffect(()=>{
        updateChar();
     },[]
     )

    
    
    useEffect(()=>{
        updateChar();
    }, [props.charId])


    let updateChar =()=>{
        const{charId} = props
        if(!charId){
            return;
        }

        onLoading();

        marvelserice
            .getCharecter(charId)
            .then(onCharLoaded)
            .catch(onError)
    }


   let  onCharLoaded=(char)=>{
            setChar(char)
            setLoading(loading=>false)
            setError(error=>false)
        }
    
       let onError=()=>{
        setLoading(loading=>false)
        setError(error=>true)
       }
    

       let onLoading=()=>{
        setLoading(loading=>true)
         
    }


        let skeleton= char || loading || error ? null : <Skeleton/>;
        let errorMessege = error? <ErrorMessege/>:null;
        let spinner = loading ? <Spinner/> : null;
        let content = !(loading || error || !char) ?  <View char = {char}/> : null;
    

    return (
        <div className="char__info">
            {skeleton}
            {errorMessege}
            {spinner}
            {content}
        </div>
    )
    }
const View = ({char})=>{
    let {name,description,thumbnail,homepage,wiki,comics}=char;
    let imgStyle = {'objectFit' : 'cover'};
        if (char.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
            imgStyle = {'objectFit' : 'unset'};}
    

  return(
     <>   <div className="char__basics">
     <img src={thumbnail} alt={name} style={imgStyle}/>
     <div>
         <div className="char__info-name">{name}</div>
         <div className="char__btns">
             <a href={homepage} className="button button__main">
                 <div className="inner">homepage</div>
             </a>
             <a href={wiki} className="button button__secondary">
                 <div className="inner">Wiki</div>
             </a>
         </div>
     </div>
 </div>
 <div className="char__descr">
    {description}
 </div>
 <div className="char__comics">Comics:</div>
 <ul className="char__comics-list">
 {comics.length > 0 ? null : 'There is no comics with this character'}
                
    {
    comics.map((item,i)=>{
        if(i>9){return;}
        return (
            <li key={i} className="char__comics-item">
         {item.name}
            </li>
        )
    })
    }
     
 </ul>
 </>
  )  
}

export default CharInfo;