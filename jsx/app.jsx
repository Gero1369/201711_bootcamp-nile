const React = require('react')
const ReactDOM = require('react-dom')
const { hashHistory,
  Router,
  Route,
  IndexRoute,
  Link,
  IndexLink
} = require('react-router')

const Modal = require('./modal.jsx')
const Cart = require('./cart.jsx')
const Checkout = require('./checkout.jsx')
const Product = require('./product.jsx')
const Profile = require('./profile.jsx')

const PRODUCTS = [
  { id: 0, src: 'images/proexpress-cover.jpg', title: 'Pro Express.js', url: 'http://amzn.to/1D6qiqk' },
  { id: 1, src: 'images/practicalnode-cover.jpeg', title: 'Practical Node.js', url: 'http://amzn.to/NuQ0fM' },
  { id: 2, src: 'images/expressapiref-cover.jpg', title: 'Express API Reference', url: 'http://amzn.to/1xcHanf' },
  { id: 3, src: 'images/reactquickly-cover.jpg', title: 'React Quickly', url: 'https://www.manning.com/books/react-quickly'},
  { id: 4, src: 'images/fullstack-cover.png', title: 'Full Stack JavaScript', url: 'http://www.apress.com/9781484217504'}
]

const Heading = () => {
  return <h1>Nile Book Store</h1>
}

const Copy = () => {
  return <p>Please click on a book to view details in a modal. You can copy/paste the link of the modal. The link will open the book on a separate page.</p>
}

class App extends React.Component {
  
  handleNameChange(event){
    this.setState({name: event.target.value})
  }

  componentWillReceiveProps(nextProps) {
    this.isModal = (nextProps.location.state &&
      nextProps.location.state.modal)
    if (this.isModal &&
      nextProps.location.key !== this.props.location.key) {
      this.previousChildren = this.props.children
    }
  }
  
  render() {
    
    let name = undefined
//    console.log('Modal: ', this.isModal)
    return (
      <div className="well">
        <Heading/>
        <div>
          {(this.isModal)?this.previousChildren:this.props.children}
          {/* {this.props.children} */}
          {(this.isModal)?
            <Modal isOpen={true} returnTo={this.props.location.state.returnTo}>
              {this.props.children}
            </Modal> : ''
          }
        </div>
      </div>
    )
  }
}

class Index extends React.Component {
  render() {
        console.log(`props name: ${this.props.name}`)
    return (
      <div className="container">
        <Copy/>
        <p><Link to="/cart" className="btn btn-danger">Cart</Link></p>
        <div className="row">
          {PRODUCTS.map(picture => (
            <Link style={{ width: '33%', display:'inline-block' }} key={picture.id}
              to={{pathname: `/products/${picture.id}`,
                state: { modal: true,
                  returnTo: this.props.location.pathname }
                }
              }>
              <img className="img-fluid" style={{ margin: 10 }} src={picture.src} height="160" />
            </Link>
          ))}
        </div>
        {(this.props.name) ? <p>Hello, {this.props.name}!</p> : <p><Link to="/profile" className="btn btn-danger">Go Enter Your Name</Link></p> }
      </div>
    )
  }
}
let cartItems = {}
const addToCart = (id) => {
  if (cartItems[id])
    cartItems[id] += 1
  else
    cartItems[id] = 1
}

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Index}/>
      <Route path="/products/:id" component={Product}
        addToCart={addToCart}
        products={PRODUCTS} />
      <Route path="/cart" component={Cart}
      cartItems={cartItems} products={PRODUCTS}/>
      <Route path="/profile" component={Profile} />
      <Route path="/v2" component={()=><p>This would be a the layout v2 page</p>} />
    </Route>
    <Route path="/checkout" component={Checkout}
      cartItems={cartItems} products={PRODUCTS}/>
  </Router>
), document.getElementById('content'))
