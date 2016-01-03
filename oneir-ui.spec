Summary: oneIR web user interface
Name: oneir-ui
Version: %{version}
Release: %{release}
License: GPLv2+
Group: Applications/Internet
Packager: Fabian van der Werf <fvanderwerf@gmail.com>
Source: %{name}-%{version}.tar.gz
BuildArch: noarch

%description
A web application that provides a user interface and connects with oneir-service.

%prep
%setup

%build

%install
install -D index.html %{buildroot}/srv/oneir-ui/index.html

%files
/srv/oneir-ui/index.html


