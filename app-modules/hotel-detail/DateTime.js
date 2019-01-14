import React from 'react';
import moment from 'moment';
import { DatePicker, Button } from 'antd';
import { FormattedMessage } from 'react-intl';
import InputN from 'components/input-night';

export default class DateTime extends React.Component {
  state = {
    startDate: moment(),
    endDate: moment(),
  }
  render() {
    return (<div className="date-time">
      <div className="group">
        <div className="g-label">
          <FormattedMessage id="START_DATE" />
        </div>
        <DatePicker value={this.state.startDate} />
      </div>
      <div className="group">
        <div className="g-label">
          <FormattedMessage id="RETURN_DATE" />
        </div>
        <DatePicker value={this.state.endDate} />
      </div>
      <div className="group">
        <div className="g-label">
          <FormattedMessage id="NUM_NIGHT" />
        </div>
        <InputN />
      </div>
      <div className="group">
        <div className="g-label">
          &nbsp;
        </div>
        <Button type="primary">
          <FormattedMessage id="UPDATE" />
        </Button>
      </div>
    </div >)
  }
}