package com.tns.gen.java.lang;

public class Object_image_19_32_ImageLoadedListenerImpl extends java.lang.Object implements com.tns.NativeScriptHashCodeProvider, org.nativescript.widgets.image.Worker.OnImageLoadedListener {
	public Object_image_19_32_ImageLoadedListenerImpl(){
		super();
		com.tns.Runtime.initInstance(this);
	}

	public void onImageLoaded(boolean param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "onImageLoaded", void.class, args);
	}

	public boolean equals__super(java.lang.Object other) {
		return super.equals(other);
	}

	public int hashCode__super() {
		return super.hashCode();
	}

}
