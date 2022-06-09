package com.smsbulky;

import android.app.role.RoleManager;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.provider.Telephony;
import android.widget.Toast;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "SMSBulky";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    csdh();
  }

  public void csdh(){
    if(Build.VERSION.SDK_INT < Build.VERSION_CODES.Q){
      //String mypackagename = getPackageName();
      if(Telephony.Sms.getDefaultSmsPackage(this)!=null){
        if (Telephony.Sms.getDefaultSmsPackage(this).equals(getPackageName())){
          //todo go nain activity
          Toast.makeText(this, "todo go nain activity", Toast.LENGTH_SHORT).show();
        }else{
          Intent setSmsAppIntent = new Intent(Telephony.Sms.Intents.ACTION_CHANGE_DEFAULT);
          setSmsAppIntent.putExtra(Telephony.Sms.Intents.EXTRA_PACKAGE_NAME,getPackageName());
          startActivityForResult(setSmsAppIntent, 1);
        }
      }else{
        Toast.makeText(this, "no tttt", Toast.LENGTH_SHORT).show();
      }
    }
    else{
      RoleManager rolemanager = getApplicationContext().getSystemService(RoleManager.class);
      if (rolemanager.isRoleAvailable(RoleManager.ROLE_SMS)){
        if (rolemanager.isRoleHeld(RoleManager.ROLE_SMS)){
          Toast.makeText(this, "todo go nain activity", Toast.LENGTH_SHORT).show();
        }
        else{
          Toast.makeText(this, "request", Toast.LENGTH_SHORT).show();
          Intent roleRequestIntent = rolemanager.createRequestRoleIntent(RoleManager.ROLE_SMS);
          this.startActivity(roleRequestIntent);
        }
      }
    }
  }
}


