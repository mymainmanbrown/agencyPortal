import React from 'react';
import axios from 'axios';
import find from 'lodash/find';
import { Redirect } from 'react-router';
import { Button } from 'react-bootstrap';
import Griddle, {
  plugins,
  RowDefinition,
  ColumnDefinition,
} from 'griddle-react';

import FieldGroup from './FieldGroup.jsx';

const NewLayout = ({ Table, Filter }) => (
  <div>
    <div style={{ paddingBottom: '10px' }}>
      <Filter />
    </div>
    <div>
      <Table />
    </div>
  </div>
);

export default class Form extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      forms: {},
      entries: [],
      selectedForm: null,
      submitted: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.initialize();
  }

  initialize () {
    Promise.all([
      axios.get('/api/form?indexById=true'),
      axios.get('/api/entry'),
    ])
      .then(([ formResponse, entryResponse ]) => {
        this.setState({
          forms: formResponse.data,
          entries: entryResponse.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  onChange (name, value) {
    this.setState({ [name]: value });
  }

  onSubmit () {
    const {
      forms,
      selectedForm,
      entries,
      submitted,
      ...submittedEntries
    } = this.state;

    const record = {
      userId: window.userId,
      formId: forms[selectedForm]._id,
      submittedEntries,
    };

    axios.post('/api/submittedForm', record)
      .then(() => {
        this.setState({ submitted: true });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  prepareEntry (id) {
    const entry = find(this.state.entries, { _id: id });

    switch (entry.type) {
      case 'singleChoice': {
        return (
          <FieldGroup
            key={id}
            id={id}
            type="radio"
            label={entry.text}
            description={entry.description}
            options={entry.choices}
            onChange={this.onChange}
            placeholder="Enter text"
          />
        );
      }
      case 'shortText': {
        return (
          <FieldGroup
            key={id}
            id={id}
            type="text"
            label={entry.text}
            description={entry.description}
            onChange={this.onChange}
            placeholder="Enter text"
          />
        );
      }
      case 'longText': {
        return (
          <FieldGroup
            key={id}
            id={id}
            type="textarea"
            label={entry.text}
            description={entry.description}
            onChange={this.onChange}
            placeholder="Enter text"
          />
        );
      }
      case 'dateRange': {
        return (
          <FieldGroup
            key={id}
            id={id}
            type="text"
            label={entry.text}
            description={entry.description}
            onChange={this.onChange}
            placeholder="Enter a date"
          />
        );
      }
      case 'number': {
        return (
          <FieldGroup
            key={id}
            id={id}
            type="text"
            label={entry.text}
            description={entry.description}
            onChange={this.onChange}
            placeholder="Enter a number"
          />
        );
      }
    }
  }

  render () {
    const {
      forms,
      selectedForm,
      submitted,
    } = this.state;

    if (!Object.keys(forms).length) {
      return (
        <div>
          <p>Loading....</p>
        </div>
      );
    }

    if (submitted) {
      return (
        <Redirect push to='/'/>
      );
    }

    if (selectedForm) {
      const form = forms[selectedForm];

      return (
        <div>
          <h1>{form.title}</h1>
          <p>{form.description}</p>
          <form>
            {form.entries.map((entryId) => this.prepareEntry(entryId))}
          </form>
          <Button
            bsStyle='primary'
            onClick={this.onSubmit}
          >Submit</Button>
        </div>
      );
    }

    const data = Object.keys(forms).map((formId) => {
      return { form: forms[formId] };
    });

    return (
      <div>
        <Griddle
          data={data}
          plugins={[plugins.LocalPlugin]}
          components={{
            Layout: NewLayout,
          }}
        >
          <RowDefinition>
            <ColumnDefinition
              key='form'
              id='form'
              title='Form'
              customComponent={({ value }) => {
                return (
                  <a
                    onClick={() => { this.setState({ selectedForm: value.get('_id') }); }}
                  >{value.get('title')}</a>
                );
              }}
            />
          </RowDefinition>
        </Griddle>
      </div>
    );
  }
}