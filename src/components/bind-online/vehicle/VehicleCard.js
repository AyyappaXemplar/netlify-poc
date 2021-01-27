import React from 'react'
import { Container, Row, Col, Image }      from 'react-bootstrap'
export default function VehicleCard({ vehicle }) {
    
    const styles = {
        borderRadius: " 2px",
        backgroundColor: "#FFFFFF",
        boxShadow: "0 2px 3px 0 rgba(78,85,82,0.15)",
        padding: '10px',
        header: {
            color: "#4E5552",
            fontSize: "18px",
            fontWeight: "900",
            letterSpacing: 0,
            lineHeight: "22px",
            padding: 0,
            margin: 0
        },
        trim: {
            color: "#777777",
            fontSize: "16px",
            letterSpacing: 0,
            lineHeight: "19px",
            padding: 0,
            margin: 0
        },
        img:{ 
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems:"center"
        },
        copy:{ 
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems:"flex-start"
        }
    }
    return (
        <Container style={{...styles}}>
            <Row>
                <Col style={{...styles.img}}>
                    <Image src={vehicle.logo_url} width={"60px"} height={ "60px" }/>
                </Col>
                <Col xs={9} style={{...styles.copy}}>
                    <p style={{ ...styles.header }}><strong>{vehicle.year}{" "}{vehicle.manufacturer}{" "}{vehicle.model}</strong></p>
                    <p style={{...styles.trim}}>{ vehicle.trim}</p>
                    
                </Col>
            </Row>
        </Container>
    )
}
