from django.conf.urls import patterns, include, url
from django.contrib.admin.views.decorators import staff_member_required
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.contrib.auth.models import User

urlpatterns = patterns('staff.views',
    # Views in views.py
    url(r'^$', 'home'),
    url(r'^userdetail/(?P<uid>\d+)/$','userdetail'),
) + patterns('django.views.generic.create_update',
    # Generic Views
    url(r'^useradd/$', 'create_object', {'model': User, 'template_name': 'staff_useredit.html', 'post_save_redirect':"/staff/"}),
    url(r'^userdelete/(?P<object_id>\d+)/$', 'delete_object', {'model': User, 'template_name': 'staff_userdel.html', 'post_delete_redirect': '/staff/'}),
) + patterns('',
    # Class based views
    url(r'^useredit/(?P<pk>\d+)/$', staff_member_required(UpdateView.as_view(model=User, template_name='staff_useredit.html', success_url="/staff/"))),
)