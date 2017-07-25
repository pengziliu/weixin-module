package com.nsw.service;

import com.nsw.model.Message;

/**
 * Created by liuzp on 2017/5/27.
 */
public interface SmsService {

   Message  sendSms(String phoneNum, String msg, String uid, String key);

}
