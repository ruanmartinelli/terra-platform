package com.sample.model;

import java.text.DecimalFormat;

public class Temperature {
    private Integer temp;


    public Temperature() {}
    public Integer getTemp() {
        return temp;
    }
    public void setTemp(Integer temp) {
        this.temp = temp;
    }
    public Temperature(Integer temp) {
        super();
        this.temp = temp;
    }
}