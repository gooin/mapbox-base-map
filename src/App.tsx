import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl'
import styled from 'styled-components';
import './App.css';
import 'mapbox-gl/dist/mapbox-gl.css';

const Container = styled.div`
width:100%;
height:100%;
`;

function App() {
    const mapContainer = useRef(null);
    useEffect(() => {
        if (mapContainer && mapContainer.current) {
            mapboxgl.accessToken = 'pk.eyJ1IjoibGl1eWwiLCJhIjoiY2tkazBxeHN2MDh6cDJ5cGZtbjZpM2wwOSJ9.JBm-t9V_ciH_CoCkkCbwzQ';
            const map = new mapboxgl.Map({
                hash: true,
                container: mapContainer.current || '', // container id
                // style: 'mapbox://styles/mapbox/streets-v11', // style URL
                style: {
                    version: 8,
                    sources: {},
                    layers: []
                },
                center: [-74.5, 40], // starting position [lng, lat]
                zoom: 9 // starting zoom
            });
            const tileUrl = 'https://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer';
            //const tileUrl = 'http://172.24.129.77:26080/arcgis/rest/services/wukurongheditu38570122/MapServer';
            map.on('load', () => {
                // 底图
                map.addLayer({
                    "id": "arcgis-china-basemap",
                    "type": "raster",
                    "source": {
                        "type": "raster",
                        "tiles": [`${tileUrl}/tile/{z}/{y}/{x}`],
                        "tileSize": 256,
                        "minzoom": 0,
                        // 实测最大级别只有16级，不限制的话，地图缩放到16级以上，因为一大批瓦片请求404，会导致卡顿一下。
                        "maxzoom": 16
                    },
                });
            })
        }


    }, [])
    return (
        <Container ref={mapContainer}>
        </Container>
    );
}

export default App;
