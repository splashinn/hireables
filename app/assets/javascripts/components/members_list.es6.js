// Require React
React = require('react/addons');
var $ = require('jquery-browserify');
var Loader = require('react-loader');

// import material UI
import mui from 'material-ui';
let List = mui.List;
let Colors = mui.Styles.Colors;
let ThemeManager = mui.Styles.ThemeManager;
let LightRawTheme = mui.Styles.LightRawTheme;
let Checkbox = mui.Checkbox;

// Dependent component
import Member from './member.es6.js'
import Search from './search.es6.js'
import NoContent from './no_content.es6.js'
import Pagination from './pagination.es6.js'

// Define component
const MembersList = React.createClass({

  getInitialState () {
    return {
      members: [],
      rels: [],
      path: this.props.path,
      featured: this.props.featured,
      loaded: false,
      muiTheme: ThemeManager.getMuiTheme(LightRawTheme)
    };
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  componentWillMount() {
    let newMuiTheme = ThemeManager.modifyRawThemePalette(this.state.muiTheme, {
      accent1Color: Colors.deepOrange500
    });
    this.setState({muiTheme: newMuiTheme});
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentDidMount() {
    if(this.isMounted()){
      var query = decodeURIComponent(document.location.search.replace('?', ''));
      var path = !query? this.state.path : this.state.path + '?' + query
      this._fetchMembers(path, {});
    }
  },

  setChecked(e, checked) {
    this.setState({loaded: false});
    this._fetchMembers(this.state.path, {hireable: checked});
  },

  render() {

    let containerStyle = {
      paddingTop: '50px'
    };

    let subHeaderStyles = {
      fontSize: '25px',
      marginBottom: '20px',
      padding: '0',
      display: 'inline-block',
      marginRight: '30px'
    };

    let checkboxStyles = {
      display: 'inline-block',
      width: 'auto',
      marginRight: '20px',
      marginTop: '5px',
      height: '20px',
      width: '50%'
    };

    return (
        <div className="members-list">
          <div className="container">
            <div className="members-list members--small sm-pull-reset">
              <Search action={"/members"} />
            </div>
          </div>
          <List subheader="Members" subheaderStyle={subHeaderStyles} className="container" style={containerStyle}>
            <Loader loaded={this.state.loaded}>
              {this.state.members.map(member => (
                <Member member={member} key={member.id} meta={this.props.meta} />
              ))}
            </Loader>
          </List>
          {this.state.rels?
            <Pagination links={this.state.rels} />
            : <NoContent />
          }
        </div>
    );
  },

  _preFetchPages(link) {
    $.get(link, function(data) {
    }, "html");
  },

  _fetchMembers(path, params) {
    $.ajaxSetup({
      cache: false
    });

    $.getJSON(path, params, function(json, textStatus) {
      this.setState({
        members: json.members,
        rels: json.rels,
        loaded: true
      });

      json.rels.map(function(link) {
        this._preFetchPages('?' + decodeURIComponent(link.url));
      }.bind(this));

    }.bind(this));
  }

});

module.exports = MembersList;
