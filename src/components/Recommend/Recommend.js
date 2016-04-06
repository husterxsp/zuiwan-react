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
        window.addEventListener('scroll', this.handleScroll);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    handleScroll(e) {
        let body = e.target.body;
        let height1 = body.offsetHeight + body.scrollTop;
        if (height1 > $("#App").height() - 300) {
            if (!this.state.loadingData && this.state.page) {
                this.getRecommend();
                this.setState({
                    loadingData: true
                })
            }
        }
    }
    getRecommend() {
        let that = this;
        let page = that.state.page;
        $.get("http://zuiwant.com/zuiwan-backend/index.php/article/get_recommend", {
                page: page
            })
            .done(function(res) {
                if (page == 1) {
                    // 首次加载
                    page++;
                    that.setState({
                        banner: res.banner,
                        recommend: res.recommend,
                    })
                    that.initSlide();

                    //隐藏加载gif
                    $(".loading").hide();
                } else {
                    page++;
                    that.setState({
                        recommend: that.state.recommend.concat(res.recommend),
                        loadingData: false,
                    });
                    if (that.state.recommend.length >= res.recommendCount) {
                        //已加载完
                        page = 0;
                    }
                }
                that.setState({
                    page: page,
                    loadingData: false,
                })

            })
            .fail(function(res) {
                console.log(res);
            });
    }
    initSlide() {
        let that = this;
        new Swipe($(".recommend #slide")[0], {
            startSlide: 0,
            speed: 400,
            auto: 3000,
            continuous: true,
            disableScroll: false,
            stopPropagation: false,
            callback: function(index, elem) {
                that.setState({
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