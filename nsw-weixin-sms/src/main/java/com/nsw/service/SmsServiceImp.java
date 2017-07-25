package com.nsw.service;

import com.nsw.model.Message;
import com.nsw.utils.HttpClientUtil;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * Created by liuzp on 2017/5/27.
 */
public class SmsServiceImp implements SmsService {

    private Log log = LogFactory.getLog(this.getClass());

    public Message sendSms(String phoneNum, String msg, String uid, String key) {

        Message message = new Message(true,"发送成功!");
        HttpClientUtil client = HttpClientUtil.getInstance();
        int result = client.sendMsgUtf8(uid, key, msg, phoneNum);
        if(result<=0){
            log.error(client.getErrorMsg(result));
            message.setIsSuc(false);
            message.setMsg(client.getErrorMsg(result));
        }else{
            log.info("成功发送短信条数:"+result);
        }
        return message;
    }
}
