import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import Slideshow from '../../components/Slideshow/Slideshow.js';

import PartyPositionGroup from '../../components/PartyPositionGroup/PartyPositionGroup.js';
import PositionLegislatorGroup from '../../components/PositionLegislatorGroup/PositionLegislatorGroup.js';
import PositionPartyGroup from '../../components/PositionPartyGroup/PositionPartyGroup.js';

import IssueController from '../../components/IssueController/IssueController.js';

import PositionRecord from '../../components/PositionRecord/PositionRecord.js';

const VIEW_PARTY = 'VIEW_PARTY';
const VIEW_LEGISLATOR = 'VIEW_LEGISLATOR';
const VIEW_POSITION = 'VIEW_POSITION';

@connect(
    state => ({
                issues: state.issues, 
                partyView: state.partyView,
                legislatorView: state.legislatorView,
                positionView: state.positionView,
                issueController: state.issueController
              }),
    dispatch => bindActionCreators({}, dispatch))

export default class Issue extends Component {
  static propTypes = {
     issues: PropTypes.object.isRequired,
     partyView: PropTypes.object.isRequired,
     legislatorView: PropTypes.object.isRequired,
     positionView: PropTypes.object.isRequired,
     issueController: PropTypes.object.isRequired
  }

  constructor(props) { super(props)
    this.state = {
        activeRecord: "",
        activeLegislator: "",
        isLocked: false
    }
  }
 
  _setToActiveRecord(value, event){
      //console.log("set to active")
      //console.log(this.state.isLocked);
      if(this.state.isLocked === false){
         this.setState({ activeRecord: value });
      }
  }

  _setToLockedRecord(value, event){
      console.log("LOCK!")
      if((this.state.activeRecord.id === value.id)&&(this.state.isLocked===true)){
          this.setState({ 
            isLocked: false
          });
      }else{
          this.setState({ 
            activeRecord: value,
            isLocked: true
          });

      }
  }

  _resetActive(){  
      
      this.setState({ activeRecord: "" });
     
  }

  render() {
    const styles = require('./Issue.scss');

    const {issues, partyView, legislatorView, positionView, issueController} = this.props;
    const {activeRecord, activeLegislator, isLocked} = this.state;
   
    const currentIssueName = this.props.params.issueName;/* 從 URL 知道現在讀的議題頁面 */

    const currentIssue = issues[currentIssueName]//只拿目前頁面議題的議題基本資料，maybe refine to ducks/select later on
  

    let bindSetToActiveRecord = this._setToActiveRecord.bind(this);
    let bindResetActive = this._resetActive.bind(this);
    let bindSetToLockedRecord = this._setToLockedRecord.bind(this);
    let bindSetActiveLegislator = "";

    /* 1. 看政黨 */
    const currentPartyView = partyView[currentIssue.titleEng];
    let partyPositionGroups = currentPartyView.partyPositions.map((value, index)=>{
        //console.log(value);
        return <PartyPositionGroup data={value} issueStatement={currentPartyView.statement} key={index}
                                   setToActiveRecord={bindSetToActiveRecord}
                                   setToLockedRecord={bindSetToLockedRecord}
                                   resetActive={bindResetActive}
                                   activeRecord={activeRecord}
                                   isLocked={isLocked} />;
    });


    /* 2. 看立委 */
    const currentLegislatorView = legislatorView[currentIssue.titleEng];
    let positionLegislatorGroups = currentLegislatorView.positions.map((value, index)=>{
        //console.log(value);
        return <PositionLegislatorGroup data={value} issueStatement={currentPartyView.statement} key={index}
                                        setToActiveRecord={bindSetToActiveRecord}
                                        activeLegislator={activeLegislator}
                                        currentIssueName={currentIssueName}/>;
    });

    /* 3. 看表態 */
    const currentPositionView = positionView[currentIssue.titleEng];//只拿: 目前頁面議題的表態資料
    let positionPartyGroups = currentPositionView.positions.map((value, index)=>{
        //console.log(value);
        return <PositionPartyGroup data={value} issueStatement={currentPartyView.statement} key={index}
                                   setToActiveRecord={bindSetToActiveRecord}
                                   setToLockedRecord={bindSetToLockedRecord}
                                   resetActive={bindResetActive}
                                   activeRecord={activeRecord}
                                   isLocked={isLocked}/>;
    });


    let positionFigure;
    switch(issueController.activeView){
        case VIEW_PARTY: 
            positionFigure = partyPositionGroups;
            break;

        case VIEW_LEGISLATOR: 
            positionFigure = positionLegislatorGroups;
            break;

        case VIEW_POSITION: 
            positionFigure = positionPartyGroups;
            break;
        
    }


    return (
      <div className={styles.masthead}>
          <Slideshow data={currentIssue.slideshows} topic={currentIssue.title}/>
          
          <IssueController/>
          
          <div className={styles.records}>
            {positionFigure}
          </div>
          
      </div>
    );
  }
}
