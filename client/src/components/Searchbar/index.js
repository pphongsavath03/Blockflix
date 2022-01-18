
import React, { useEffect, useState } from 'react';
import { 
    Layout, 
    Input, 
    Row, 
    Col, 
    Card, 
    Tag, 
    Spin, 
    Alert, 
    Modal, 
    Button,
    Typography 
} from 'antd';
import 'antd/dist/antd.css';
// import React from "react";
// import { Link } from "react-router-dom";
// import { pluralize } from "../../utils/helpers";
// import { ADD_TO_CART, UPDATE_CART_QUANTITY} from '../../utils/actions';
// import { idbPromise } from "../../utils/helpers";
// import { useDispatch, useSelector } from 'react-redux';

const API_KEY = "bb6d6e88";
const { Content} = Layout;
const { Search } = Input;
const { Meta } = Card;
const TextTitle = Typography.Title;




const SearchBox = ({searchHandler}) => {
    return (
        <Row>
            <Col xs={16} md={12}  offset={6}>
                <Search
                    placeholder="enter movie, series, episode name"
                    enterButton="Search"
                    size="large"
                    onSearch={value => searchHandler(value)}
                />
            </Col>
        </Row>
    )
}

const ColCardBox = ({Title, imdbID, Poster, Type, ShowDetail, DetailRequest, ActivateModal}) => {

    const clickHandler = () => {

        // Display Modal and Loading Icon
        ActivateModal(true);
        DetailRequest(true);

        fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`)
        .then(resp => resp)
        .then(resp => resp.json())
        .then(response => {
            DetailRequest(false);
            ShowDetail(response);
        })
        .catch(({message}) => {
            DetailRequest(false);
        })
    }


    return ( 

        <Col style={{margin: '20px 0'}} flex className="gutter-row" span={4}>
            <div className="gutter-box">
                <Card
                    style={{ width: 200,  }}
                    cover={
                        <img
                            alt={Title}
                            src={Poster === 'N/A' ? 'https://placehold.it/198x264&text=Image+Not+Found' : Poster}
                        />
                    }
                    onClick={() => clickHandler()}
                >
                    <Meta
                            title={Title}
                            description={false}
                            
                    />
                    <Row style={{marginTop: '10px'}} flex justify='space-around' className="gutter-row">
                        <Col>
                            <Tag style={{ borderRadius:'5px'}} color="magenta">{Type}</Tag>
                        </Col>
                                          
                    </Row>
                </Card>
            </div>
            <Col offset={24}>
              <Button type='primary'  style={{marginTop: '3px',  borderRadius:'3px', marginLeft: '15px'}} >Add to cart</Button>
            </Col>
        </Col>


    )
}

const MovieDetail = ({Title, Poster, imdbRating, Rated, Runtime, Genre, Plot}) => {
    return (
        <Row style={{marginLeft:'50px'}} type="flex" justify='space-between'>
            <Col xs={9} md={10}>
                <img 
                    src={Poster === 'N/A' ? 'https://placehold.it/198x264&text=Image+Not+Found' : Poster} 
                    alt={Title} 
                />
            </Col>
            <Col span={13}>
                <Row>
                    <Col span={18}>
                        <TextTitle level={4}>{Title}</TextTitle></Col>
                    <Col span={4} style={{textAlign:'right'}}>
                        <TextTitle level={4}><span style={{color: '#41A8F8'}}>{imdbRating}</span></TextTitle>
                    </Col>
                </Row>
                <Row style={{marginBottom: '20px'}}>
                    <Col>
                        <Tag>{Rated}</Tag> 
                        <Tag>{Runtime}</Tag> 
                        <Tag>{Genre}</Tag>
                    </Col>
                </Row>
                <Row>
                    <Col>{Plot}</Col>
                </Row>
            </Col>
        </Row>
    )
}

const Loader = () => (
    <div style={{margin: '20px 0', textAlign: 'center'}}>
        <Spin />
    </div>
)

function SearchMovies() {

    const [data, setData] = useState(null);
    const [price, setPricing] = useState(null)
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [q, setQuery] = useState('batman');
    const [activateModal, setActivateModal] = useState(false);
    const [detail, setShowDetail] = useState(false);
    const [detailRequest, setDetailRequest] = useState(false);


    useEffect(() => {

        setLoading(true);
        setError(null);
        setData(null);

        fetch(`http://www.omdbapi.com/?s=${q}&apikey=${API_KEY}`)
        .then(resp => resp)
        .then(resp => resp.json())
        .then(response => {
            if (response.Response === 'False') {
                setError(response.Error);
            }
            else {
                setData(response.Search);
            }

            setLoading(false);
        })
        .catch(({message}) => {
            setError(message);
            setLoading(false);
        })

    }, [q]);

    
    return (
        <div className="App">
            <Layout className="layout">
                <Content style={{ padding: '25 50px' }}>
                    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                        <SearchBox searchHandler={setQuery} />
                        <br />
                        
                        <Row gutter={8} type="flex" wrap="true" justify="space-around">
                           
                            { loading &&
                                <Loader />
                            }

                            { error !== null &&
                                <div style={{margin: '20px 0'}}>
                                    <Alert message={error} type="error" />
                                </div>
                            }
                            
                            { data !== null && data.length > 0 && data.map((result, index) => (
                              <Col key={index} >
                                <ColCardBox 
                                    ShowDetail={setShowDetail} 
                                    DetailRequest={setDetailRequest}
                                    ActivateModal={setActivateModal}
                                    {...result} 
                                />
                                </Col>
                            ))}

                        </Row>
                    </div>
                    <Modal
                        title='Detail'
                        centered
                        visible={activateModal}
                        onCancel={() => setActivateModal(false)}
                        footer={null}
                        width={800}
                        >
                        { detailRequest === false ?
                            (<MovieDetail {...detail} />) :
                            (<Loader />)
                        }
                    </Modal>
                </Content>
            </Layout>
        </div>
    );
}

export default SearchMovies;