import React, { Component } from 'react';
import StackGrid, { transitions, easings } from "react-stack-grid";
import {Link } from "react-router-dom";
import '../css/grid_style.css'
import '../css/normalize.css'

// import StackGrid, { transitions, easings } from '../../../src/';


const transition = transitions.scaleDown;

const images_src = [
        {src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq5awRDOJvuFKk2mH2aWhCb0InqvLQ5yXylbuujXbTm-XcqIotPA&s', text : 'image 1'},
        {src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2qolld84RI93_6EHatE3q80f1r7-bnDSEGcPgldWquqBE4aQ6Bg&s', text : 'image 2'},        
        {src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDdP23eN4dlTp4XqbDPawFV75zsz6X65Fhe-9QI8xMdUobf3VNHA&s', text : 'image 3'},
        {src:'https://i.pinimg.com/originals/0d/d4/15/0dd415c0b4b3a5a51aa2f68faf1030fa.png', text : 'image 4'},
        {src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2fFbKENtixKBRHjCQVpfixejCCN8F-5gnEVduwMjz3d8ukyBV&s', text : 'image 5'},
        {src:'https://i.pinimg.com/originals/f8/93/2f/f8932f4b00aac09a768c21097dd95e13.png', text : 'image 6'},
        {src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK9HhXtX8Ty5ul4fMW8AFH2r6ZmKxQfhzOFzQ_hMtm0PI_E37k&s', text : 'image 7'},
        {src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYXvNznw7cf7MJylpyKDCw5zi1lhu0hQVpfYTw2e0neIxfkabZ&s', text : 'image 8'},
        {src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrJoSyfgBNG3lWbhLRycVO6Dgt0Q2CsmhTUZdr95998VpxS_ea&s', text : 'image 9'},
        {src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSutxiOqCMhtxOGbfHjoo8bzpDYPQMd2-YK6Fzlb7Wul_0_mcn3Gw&s', text: 'image 10'},
        {src:'https://images-na.ssl-images-amazon.com/images/I/4146UT14vTL.jpg', text: 'image 11'},
        {src:'https://66.media.tumblr.com/f0601355c52c71e6aa5da7b351f8e003/tumblr_nph04p5qzC1twe2yno1_1280.png', text: 'image 11'},
        {src:'https://pbs.twimg.com/media/Dy9y52lXgAAZ79H.jpg', text: 'image 12'},
        {src: 'https://i.pinimg.com/originals/b1/b1/28/b1b1288ef2d24d49bf592098732695ab.png', text: 'image 13'}        
        ]

// const images_src = [
//         {src:'https://www.itl.cat/pngfile/big/12-123178_apple-hd-gray-wallpaper-mac-by-cezarislt-mac.jpg', text : 'image 1'},
//         {src:'https://visualhunt.com/photos/1/snow-nature-forest-winter-1.jpg?s=s', text : 'image 2'},        
//         {src:'https://visualhunt.com/photos/1/forest-in-winter-2.jpg?s=s', text : 'image 3'},
//         {src:'https://visualhunt.com/photos/1/silhouette-of-cat-on-branch-against-full-moon.jpg?s=l', text : 'image 4'},
//         {src:'https://visualhunt.com/photos/1/night-star-moon-big-bar-human-universe-starry-sky.jpg?s=l', text : 'image 5'},
//         //{src:'https://visualhunt.com/photos/2/tree-lake-reflection-landscape-nature-sky-scenery.jpg?s=l', text : 'image 6'},
//         {src:'https://visualhunt.com/photos/1/deer-on-road-in-snow-with-a-woman-in-background.jpg?s=s', text : 'image 7'},
//         {src:'https://visualhunt.com/photos/1/snow-mountains-cloudy-forest.jpg?s=s', text : 'image 8'},
//         {src:'https://wallpaperaccess.com/full/350125.png', text : 'image 9'},
//         {src:'https://visualhunt.com/photos/2/portrait-of-cat-lying-on-floor.jpg?s=s', text: 'image 10'},
//         {src:'https://visualhunt.com/photos/1/milky-way-in-rocky-landscape-at-night.jpg?s=l', text: 'image 11'},
//         // {src:'https://66.media.tumblr.com/f0601355c52c71e6aa5da7b351f8e003/tumblr_nph04p5qzC1twe2yno1_1280.png', text: 'image 11'},
//         // {src:'https://pbs.twimg.com/media/Dy9y52lXgAAZ79H.jpg', text: 'image 12'},
//         // {src: 'https://i.pinimg.com/originals/b1/b1/28/b1b1288ef2d24d49bf592098732695ab.png', text: 'image 13'}        
//         ]

class HomePage extends Component{
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         images_src : ['data:image/jpeg;base64,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',
    //         'data:image/jpeg;base64,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',
    //         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq5awRDOJvuFKk2mH2aWhCb0InqvLQ5yXylbuujXbTm-XcqIotPA&s',
    //         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2qolld84RI93_6EHatE3q80f1r7-bnDSEGcPgldWquqBE4aQ6Bg&s',
    //         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDdP23eN4dlTp4XqbDPawFV75zsz6X65Fhe-9QI8xMdUobf3VNHA&s',
    //         'https://i.pinimg.com/originals/0d/d4/15/0dd415c0b4b3a5a51aa2f68faf1030fa.png',
    //         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2fFbKENtixKBRHjCQVpfixejCCN8F-5gnEVduwMjz3d8ukyBV&s',
    //         'https://www.google.com/imgres?imgurl=https%3A%2F%2F1.bp.blogspot.com%2F-PrfaoQtXo8M%2FVwpJKGcPv1I%2FAAAAAAABTx0%2F6iNF-CbWelYwDVnDCU0uJQklwebHIaHUA%2Fs1600%2F20160316_200835.jpg&imgrefurl=https%3A%2F%2Fkiyokoyasuda.blogspot.com%2F2016%2F04%2Ffood-x-travel-kissa-cafe-sumikko-shibuya.html&docid=Ct1FXES27FvmbM&tbnid=1apTpurzqrPHTM%3A&vet=10ahUKEwiqovz-7ITmAhXCQN4KHfD4A3YQMwizAShPME8..i&w=1600&h=900&client=safari&bih=789&biw=1161&q=ebi%20no%20shippo&ved=0ahUKEwiqovz-7ITmAhXCQN4KHfD4A3YQMwizAShPME8&iact=mrc&uact=8',
    //         'https://i.pinimg.com/originals/f8/93/2f/f8932f4b00aac09a768c21097dd95e13.png',
    //         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK9HhXtX8Ty5ul4fMW8AFH2r6ZmKxQfhzOFzQ_hMtm0PI_E37k&s',
    //         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYXvNznw7cf7MJylpyKDCw5zi1lhu0hQVpfYTw2e0neIxfkabZ&s',
    //         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrJoSyfgBNG3lWbhLRycVO6Dgt0Q2CsmhTUZdr95998VpxS_ea&s',
    //         ]
    //     };
    // }

    render(){

        return(
            <StackGrid
                monitorImagesLoaded
                columnWidth={300}
                duration={600}
                gutterWidth={15}
                gutterHeight={15}
                easing={easings.cubicOut}
                appearDelay={60}
                appear={transition.appear}
                appeared={transition.appeared}
                enter={transition.enter}
                entered={transition.entered}
                leaved={transition.leaved}
            >
                {images_src.map(
                    element => (
                        <figure key={element.src} className="image">
                            <Link to="/test">
                                <img src={element.src} alt={element.text}/>  
                                {/* <figcaption>{element.text}</figcaption> */}
                            </Link>
                        </figure>
                        
                    )
                )}
            </StackGrid>
        
        );
    }
}

export default HomePage;