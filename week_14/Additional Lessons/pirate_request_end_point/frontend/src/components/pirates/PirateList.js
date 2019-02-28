import React from 'react';
import BasicPirate from './BasicPirate.js';


const PirateList = (props) => {
	const pirates = props.pirates.map((pirate, index) => {
		 	return (<li key={index} className="component-item">
			<div className="component">
				<BasicPirate pirate={pirate} index={index}/>
				</div>
			</li>
		)
		})

	return (
		<ul className="component-list">
	    {pirates}
	  </ul>

	)
}
 export default PirateList;
