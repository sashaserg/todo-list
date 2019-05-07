/* library */
import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

/* style */
import './DiaryNote.sass';

class DiaryTode extends Component
{
  render()
  {
    return (
      <div className='DiaryNode-container'>
        <div className='header'>
          <div className='btnField'>
            <a><FontAwesomeIcon icon='long-arrow-alt-left'/></a>
          </div>
          <div className='monthNameField'>
            <span>01 Monday</span>
          </div>
          <div className='btnField'>
          <a><FontAwesomeIcon icon='long-arrow-alt-right'/></a>
          </div>
        </div>
        <div className='textField'>
          <textarea className='text'>
            Occaecat officia laborum mollit velit consectetur exercitation veniam reprehenderit cillum Lorem et. Ex ipsum laborum do cupidatat qui. Occaecat elit enim adipisicing culpa. Laboris deserunt sit reprehenderit deserunt. Velit incididunt sit aute ad quis quis occaecat velit cupidatat et.

Sit aliqua ad elit laboris aliquip reprehenderit sit tempor labore do amet dolore. Dolore voluptate eiusmod fugiat minim duis do ut ea cupidatat eu. Fugiat aliquip consectetur et ad excepteur ullamco. Sint magna incididunt elit est incididunt duis reprehenderit nostrud dolor aliqua et. Excepteur duis ad velit incididunt est officia cupidatat voluptate nisi adipisicing nostrud ullamco ullamco id. Ullamco Lorem in amet pariatur nostrud dolor in id aute laborum.

Adipisicing anim consequat aliqua labore magna ad proident eiusmod. Fugiat veniam commodo et nisi. Aute duis voluptate consectetur enim labore. Dolor consequat culpa qui eu velit anim in labore. Non occaecat exercitation sunt duis eu. Mollit non minim non sint. Esse minim cillum pariatur elit nulla occaecat aliqua adipisicing ad duis aute.
          </textarea>
        </div>
        <div className='blankField'>{''}</div>
      </div>
    )
  }
}

export default DiaryTode;