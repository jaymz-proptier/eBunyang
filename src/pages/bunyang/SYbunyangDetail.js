import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { SYmetatag } from "../../components/layout";
import { SYproductHeader } from "../";
import { SYbasicPreview, SYproductTabSection } from "../bunyang";
import { useBunyangDetailPreviewQuery } from "../../apis/bunyang/bunyang";
import { SYproductPriceView } from "../../hooks/";
import TagManager from "react-gtm-module";

function SYbunyangDetail() {
    const { search } = useLocation();
    const SYquery = queryString.parse(search);
    const [SYdata, SYsetData] = useState(null);

    const SYsectionWrap = () => {
        const { data, refetch } = useBunyangDetailPreviewQuery({
            params: { build_dtl_cd: SYquery.build_dtl_cd, supp_cd: SYquery.supp_cd },
            onSuccess: (data) => {
                document.querySelector("title").innerHTML = data.data.result.detail.build_nm;
                SYsetData(data.data.result);
                // console.log("Success[bunyangList]", data);               
                const SYtagManager = {
                    dataLayer: {
                        event: "view_item",
                        ecommerce: {
                            items: [{
                                item_id: data.data.result.detail.bclass_nm,
                                item_name: data.data.result.detail.build_nm,
                            }],
                            value: 0,
                            currency: "KRW",

                        },
                    },
                }
                TagManager.dataLayer(SYtagManager);
            },
            onError: (error) => {
                console.log("Error[bunyangList]", error);
            },
        });


        const [scroll, setScroll] = useState(null);
        const [scrollCheck, setScrollCheck] = useState(false);
        let lastScrollPosition = window.pageYOffset;

        const handleScroll = () => {
            const currentScrollPosition = window.pageYOffset;
            if (currentScrollPosition > lastScrollPosition) {
                setScroll('down');
                setScrollCheck(true);
            } else if (currentScrollPosition < lastScrollPosition) {
                setScroll('up');
                setScrollCheck(false);
            }
      
            lastScrollPosition = currentScrollPosition;
        };

        useEffect(() => {
            refetch();
            window.addEventListener('scroll', handleScroll);
            return () => {
                window.removeEventListener('scroll', handleScroll); //clean up
            };
        }, [SYquery.build_dtl_cd, SYquery.supp_cd]);

        return SYdata ? (
            <div className="sectionWrap bunyangdetail">
                <SYmetatag title={SYdata.detail.build_nm + " - e분양"} meta_title={SYdata.detail.build_nm + " - e분양"} description={"총" + SYdata.detail.total_house_cnt + (SYdata.detail.dong_cnt > 0 ? " | " + SYdata.detail.dong_cnt + "개동" : "") + (SYdata.detail.flr_cnt ? " | " + SYdata.detail.flr_cnt : "") + SYproductPriceView(SYdata.detail.min_price, SYdata.detail.max_price)} image={SYdata.detail.image_url} />
                <SYproductHeader SYdata={SYdata.detail} />
                {
                    SYdata.detail.sell_office_phone ?
                        <a href={`tel:${SYdata.detail.sell_office_phone}`} className={scrollCheck ? "mobileBottomBtn scroll" : "mobileBottomBtn"}>
                            <span>문의하기</span>
                        </a>
                        : null
                }
                <div className="contentInfoWrap">
                    <SYbasicPreview SYdata={SYdata} />
                    <SYproductTabSection SYdata={SYdata} SYquery={SYquery} />
                </div>
            </div>
        ) : null;
    }
    return (
        <div className="contentWrap">
            <SYsectionWrap />
        </div>
    );

}
export default React.memo(SYbunyangDetail);