import React from 'react';
import Swipe from 'swipe-js';
import RecommendSlide from './RecommendSlide/RecommendSlide.js';
import ArticleList from '../ArticleList/ArticleList.js';
import './Recommend.less'

export default class Recommend extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showLoading: true,
            banner: [],
            recommend: [],
            bannerIndex: 0,
            page: 1,
            loadingData: false,
        };
    }
    componentDidMount() {
        this.getRecommend();
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll.bind(this));
    }
    handleScroll(e) {
        let body = e.target.body;
        let height1 = body.offsetHeight + body.scrollTop;
        if (height1 > $('#App').height() - 300) {
            if (!this.state.loadingData && this.state.page) {
                this.getRecommend();
                this.setState({
                    loadingData: true,
                })
            }
        }
    }
    setRecommend(res, page) {
        if (page == 1) {
            // 首次加载
            page++;
            this.setState({
                banner: res.banner,
                recommend: res.recommend,
            })
            this.initSlide();

            //隐藏加载gif
            $('.loading').hide();
        } else {
            page++;
            this.setState({
                recommend: this.state.recommend.concat(res.recommend),
                loadingData: false,
            });
            if (this.state.recommend.length >= res.recommendCount) {
                //已加载完
                page = 0;
            }
        }
        this.setState({
            page: page,
            loadingData: false,
        })
    }
    getRecommend() {
        let page = this.state.page;
        fetch(`http://zuiwant.com/zuiwan-backend/index.php/article/get_recommend?page=${page}`)
            .then((res) => {
                res.json().then((data) => {
                    this.setRecommend(data, page);
                });
            }, (res) => {
                console.log(res.status);
            })
    }
    initSlide() {
        new Swipe($('.recommend #slide')[0], {
            startSlide: 0,
            speed: 400,
            auto: 3000,
            continuous: true,
            disableScroll: false,
            stopPropagation: false,
            callback: (index, elem) => {
                this.setState({
                    bannerIndex: index
                })
            }
        });
    }
    render() {
        return (
            <div className="recommend">
                <RecommendSlide slide={this.state.banner} index={this.state.bannerIndex}/>
                <div className="line"></div>
                <span className="other">others</span>
                <ArticleList list={this.state.recommend} />
            </div>
        )
    }

}